import styles from "./TimeEntry.module.css";

import { timeEntries } from "@/services/timeEntries";

interface TimeEntryProps {
  timeEntry: (typeof timeEntries)[number];
}

export const TimeEntry = ({ timeEntry }: TimeEntryProps) => {
  const { id, client, startTimestamp, stopTimestamp } = timeEntry;

  return (
    <li className={styles.timeEntry}>
      <div className={styles.timeEntryHeader}>
        <div className={styles.timeEntryTitle}>
          <h3>Client: {client}</h3>
          <p>Start: {startTimestamp}</p>
          <p>Stop: {stopTimestamp}</p>
        </div>
      </div>
    </li>
  );
};
