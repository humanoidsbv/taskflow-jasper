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

  const getHeaderText = (entry: {
    id: number;
    client: string;
    startTimestamp: string;
    stopTimestamp: string;
    billable: boolean;
  }): string => {
    const entryDate = new Date(entry.startTimestamp);
    const str = entryDate.toLocaleDateString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      weekday: "long",
      month: "numeric",
      day: "numeric",
    }); // TODO: make this a variable

    const currentDate = new Date();
    let extraText = "";
    if (currentDate.toLocaleDateString() === entryDate.toLocaleDateString())
      extraText = " (Today)";
    currentDate.setTime(currentDate.getTime() - 3600 * 1000 * 24);
    if (currentDate.toLocaleDateString() === entryDate.toLocaleDateString())
      extraText = " (Yesterday)"; // TODO: clean up code, don't use let

    return str.at(0)?.toUpperCase() + str.slice(1) + extraText;
  };

  const addTimeEntry = () => {
    setTimeEntries([
      ...timeEntries,
      {
        id: timeEntries.length + 1,
        client: "New Client",
        startTimestamp: "2026-03-10T16:00:00.000Z",
        stopTimestamp: "2026-03-10T16:13:39.000Z",
        billable: true,
      },
    ]);
  }; // TODO: clean this up

  const getElapsedHours = (startDate: Date, stopDate: Date): number => {
    const elapsedMs = stopDate.getTime() - startDate.getTime();
    const hours = Math.floor(elapsedMs / (1000 * 60)) / 60;
    return hours;
  }; // TODO: figure out how to keep this code in one place

  const getElapsedTimeFormat = (startDate: Date, stopDate: Date): string => {
    const elapsedMs = stopDate.getTime() - startDate.getTime();
    const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
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

    const startDateString = startDate.toLocaleTimeString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
    });
    const stopDateString = stopDate.toLocaleTimeString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
    }); // TODO: put this in a variable (duplicate)
    const timeInterval = `${startDateString} - ${stopDateString}`;

    return {
      client,
      billable,
      timeInterval,
      totalTime,
    };
  };

  const sortedArray = timeEntries.sort((a, b) => {
    return (
      new Date(b.startTimestamp).getTime() -
      new Date(a.startTimestamp).getTime()
    );
  }); // TODO: change name to be more clear

  const totalTimes = sortedArray.reduce<Record<string, number>>((acc, item) => {
    const date = new Date(item.startTimestamp).toLocaleDateString();
    const hours = getElapsedHours(
      new Date(item.startTimestamp),
      new Date(item.stopTimestamp),
    );
    acc[date] = (acc[date] || 0) + hours;
    return acc;
  }, {}); // TODO: change name to be more clear

  return (
    <div className={styles.container}>
      <Button onClick={addTimeEntry}>Add time entry</Button>{" "}
      {/* TODO: remove this button */}
      <ul>
        {sortedArray.map((entry, i, arr) => {
          const today = new Date(entry.startTimestamp).toLocaleDateString();
          const hasHeader =
            i === 0 ||
            today !== new Date(arr[i - 1].startTimestamp).toLocaleDateString();

          return (
            <Fragment key={entry.id}>
              {hasHeader && (
                <div className={styles.dayContainer}>
                  <h2>{getHeaderText(entry)}</h2>
                  <span>{formatHoursToText(totalTimes[today])}</span>
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
