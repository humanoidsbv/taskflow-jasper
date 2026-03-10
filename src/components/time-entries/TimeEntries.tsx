"use client";

import { Fragment, useState } from "react";

import { Button } from "../button/Button";
import { timeEntries } from "@/fixtures/timeEntries";
import { TimeEntry } from "../time-entry/TimeEntry";

import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntriesData: typeof timeEntries;
}

export const TimeEntries = ({ timeEntriesData }: TimeEntriesProps) => {
  const [timeEntries, setTimeEntries] = useState(timeEntriesData);

  const dateFormat = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });

  const timeFormat = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getHeaderText = (entry: {
    id: number;
    client: string;
    startTimestamp: string;
    stopTimestamp: string;
    billable: boolean;
  }): string => {
    const entryDate = new Date(entry.startTimestamp);
    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate.getTime() - 3600 * 1000 * 24);
    const formattedEntryDate = dateFormat.format(entryDate);

    return (
      formattedEntryDate.at(0)?.toUpperCase() +
      formattedEntryDate.slice(1) +
      (currentDate.toLocaleDateString() === entryDate.toLocaleDateString()
        ? " (Today)"
        : yesterdayDate.toLocaleDateString() === entryDate.toLocaleDateString()
          ? " (Yesterday)"
          : "")
    );
  };

  const getElapsedTime = (
    startDate: Date,
    stopDate: Date,
  ): {
    elapsedHours: number;
    elapsedMinutes: number;
  } => {
    const elapsedMs = stopDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
    const elapsedHours = Math.floor(totalMinutes / 60);
    const elapsedMinutes = totalMinutes % 60;
    return { elapsedHours, elapsedMinutes };
  };

  const getElapsedTimeFormat = (startDate: Date, stopDate: Date): string => {
    const { elapsedHours, elapsedMinutes } = getElapsedTime(
      startDate,
      stopDate,
    );
    return `${elapsedHours.toString().padStart(2, "0")}:${elapsedMinutes.toString().padStart(2, "0")}`;
  };

  const formatHoursToText = (elapsedHours: number): string => {
    const elapsedMinutes = elapsedHours * 60;
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    return `${hours.toFixed(0).toString().padStart(2, "0")}:${minutes.toFixed(0).toString().padStart(2, "0")}`;
  };

  const formatData = ({
    client,
    billable,
    startTimestamp,
    stopTimestamp,
  }: (typeof timeEntries)[number]): {
    client: string;
    billable: boolean;
    timeInterval: string;
    totalTime: string;
  } => {
    const startDate = new Date(startTimestamp);
    const stopDate = new Date(stopTimestamp);
    const totalTime = getElapsedTimeFormat(startDate, stopDate);

    const startDateString = timeFormat.format(startDate);
    const stopDateString = timeFormat.format(stopDate);
    const timeInterval = `${startDateString} - ${stopDateString}`;

    return {
      client,
      billable,
      timeInterval,
      totalTime,
    };
  };

  const sortedTimeEntries = timeEntries.sort((a, b) => {
    return (
      new Date(b.startTimestamp).getTime() -
      new Date(a.startTimestamp).getTime()
    );
  });

  const totalHoursByDay = sortedTimeEntries.reduce<Record<string, number>>(
    (acc, item) => {
      const date = new Date(item.startTimestamp).toLocaleDateString();
      const { elapsedHours } = getElapsedTime(
        new Date(item.startTimestamp),
        new Date(item.stopTimestamp),
      );
      acc[date] = (acc[date] || 0) + elapsedHours;
      return acc;
    },
    {},
  );

  return (
    <div className={styles.container}>
      <ul>
        {sortedTimeEntries.map((entry, i, arr) => {
          const today = new Date(entry.startTimestamp).toLocaleDateString();
          const hasHeader =
            i === 0 ||
            today !== new Date(arr[i - 1].startTimestamp).toLocaleDateString();

          return (
            <Fragment key={entry.id}>
              {hasHeader && (
                <div className={styles.dayContainer}>
                  <h2>{getHeaderText(entry)}</h2>
                  <span>{formatHoursToText(totalHoursByDay[today])}</span>
                </div>
              )}
              <TimeEntry data={formatData(entry)} />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
