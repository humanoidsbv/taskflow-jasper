"use client";

import { Fragment } from "react";

import {
  capitalizeString,
  dateFormat,
  formatHours,
  getElapsedTime,
} from "@/utils/utils";
import { TimeEntriesType, TimeEntryType } from "@/types/dataTypes";
import { TimeEntry } from "@/components/time-entry/TimeEntry";

import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntries: TimeEntriesType;
}

const formatHeader = ({ startTimestamp }: TimeEntryType): string => {
  const msPerDay = 24 * 3600 * 1000;
  const entryDate = new Date(startTimestamp);
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate.getTime() - msPerDay);
  const formattedEntryDate = capitalizeString(dateFormat.format(entryDate));
  const isToday = entryDate.toDateString() === currentDate.toDateString();
  const isYesterday = entryDate.toDateString() === yesterdayDate.toDateString();

  return `${formattedEntryDate}${isToday ? " (Today)" : ""}${isYesterday ? " (Yesterday)" : ""}`;
};

export const TimeEntries = ({ timeEntries }: TimeEntriesProps) => {
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
                  <h2 className={styles.dayContent}>{formatHeader(entry)}</h2>
                  <span className={styles.dayContent}>
                    {formatHours(totalHoursByDay[today])}
                  </span>
                </div>
              )}
              <TimeEntry data={entry} />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
