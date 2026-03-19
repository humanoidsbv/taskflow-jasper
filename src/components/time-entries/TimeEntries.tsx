"use client";

import { Fragment } from "react";

import { formatHeader } from "./helpers";
import { formatHours, getElapsedTime } from "@/utils/utils";
import { TimeEntry } from "@/components/time-entry/TimeEntry";
import { TimeEntryData } from "@/types/dataTypes";

import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntries: TimeEntryData[];
}

export const TimeEntries = ({ timeEntries }: TimeEntriesProps) => {
  console.table(timeEntries);

  const totalHoursByDay = timeEntries.reduce<Record<string, number>>(
    (acc, item) => {
      const date = new Date(item.startTimestamp).toLocaleDateString();
      const elapsedHours = getElapsedTime(
        new Date(item.startTimestamp),
        new Date(item.stopTimestamp),
      );
      acc[date] = (acc[date] || 0) + elapsedHours;
      return acc;
    },
    {},
  );

  return (
    <ul>
      {timeEntries.map((entry, index, timeEntries) => {
        const today = new Date(entry.startTimestamp).toLocaleDateString();
        const hasHeader =
          index === 0 ||
          today !==
            new Date(
              timeEntries[index - 1].startTimestamp,
            ).toLocaleDateString();

        return (
          <Fragment key={entry.id}>
            {hasHeader && (
              <div className={styles.container}>
                <h2 className={styles.content}>{formatHeader(entry)}</h2>
                <span className={styles.content}>
                  {formatHours(totalHoursByDay[today])}
                </span>
              </div>
            )}
            <TimeEntry data={entry} />
          </Fragment>
        );
      })}
    </ul>
  );
};
