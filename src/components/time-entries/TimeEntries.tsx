"use client";

import { useState } from "react";

import { timeEntries } from "@/fixtures/timeEntries";
import { TimeEntry } from "../time-entry/TimeEntry";

import styles from "./TimeEntries.module.css";
import { Button } from "../button/Button";

interface TimeEntriesProps {
  timeEntriesData: typeof timeEntries;
}

export const TimeEntries = ({ timeEntriesData }: TimeEntriesProps) => {
  const [timeEntries, setTimeEntries] = useState(timeEntriesData);

  const addTimeEntry = () => {
    setTimeEntries([
      ...timeEntries,
      {
        id: timeEntries.length + 1,
        client: "New Client",
        startTimestamp: "2022-09-26T16:00:00.000Z",
        stopTimestamp: "2022-09-26T18:00:00.000Z",
        billable: true,
      },
    ]);
  };

  return (
    <div className={styles.container}>
      <ul>
        {timeEntries.map((timeEntry) => {
          const startDate = new Date(timeEntry.startTimestamp);
          const stopDate = new Date(timeEntry.stopTimestamp);

          const elapsedMs = stopDate.getTime() - startDate.getTime();
          const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
          const hours = Math.floor(elapsedMinutes / 60);
          const minutes = elapsedMinutes % 60;
          const totalTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

          const startDateString = startDate.toLocaleTimeString("nl-NL", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const stopDateString = stopDate.toLocaleTimeString("nl-NL", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const timeInterval = `${startDateString} - ${stopDateString}`;

          return (
            <TimeEntry
              client={timeEntry.client}
              billable={timeEntry.billable}
              timeInterval={timeInterval}
              totalTime={totalTime}
              key={timeEntry.id}
            />
          );
        })}
      </ul>
      <Button onClick={addTimeEntry}>Add time entry</Button>
    </div>
  );
};
