"use client";

import { useState } from "react";

import { Filters } from "../filters/Filters";
import { timeEntries } from "@/fixtures/timeEntries";
import { TimeEntry } from "../time-entry/TimeEntry";

import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntriesData: typeof timeEntries;
}

export const TimeEntries = ({ timeEntriesData }: TimeEntriesProps) => {
  const filters = [
    {
      filterTitle: "All",
      filterValue: "all",
      filterPlaceholder: "All",
    },
    {
      filterTitle: "Today",
      filterValue: "today",
      filterPlaceholder: "Today",
    },
  ];

  const [timeEntries, setTimeEntries] = useState(timeEntriesData);

  return (
    <div className={styles.container}>
      <Filters filters={filters} />
      <ul>
        {timeEntries.map((timeEntry) => (
          <TimeEntry timeEntry={timeEntry} key={timeEntry.id} />
        ))}
      </ul>
    </div>
  );
};
