import { timeEntries } from "@/fixtures/timeEntries";

import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  timeEntry: (typeof timeEntries)[number];
}

export const TimeEntry = ({ timeEntry }: TimeEntryProps) => {
  const { client, startTimestamp, stopTimestamp } = timeEntry;

  return (
    <li className={styles.timeEntry}>
      <div className={styles.timeEntryHeader}>
        <div className={styles.timeEntryTitle}>
          <h3>Client: {client}</h3>
          <span>Start: {startTimestamp}</span>
          <span>Stop: {stopTimestamp}</span>
        </div>
      </div>
    </li>
  );
};
