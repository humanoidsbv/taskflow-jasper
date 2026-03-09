"use client";

import { useState } from "react";

import { timeEntries } from "@/fixtures/timeEntries";
import { TimeEntry } from "../time-entry/TimeEntry";

import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntriesData: typeof timeEntries;
}

export const TimeEntries = ({ timeEntriesData }: TimeEntriesProps) => {
  const [timeEntries, setTimeEntries] = useState(timeEntriesData);

  return (
    <div className={styles.container}>
      <ul>
        {timeEntries.map((timeEntry) => (
          <TimeEntry timeEntry={timeEntry} key={timeEntry.id} />
        ))}
      </ul>
    </div>
  );
};
