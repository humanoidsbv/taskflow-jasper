import { timeEntries } from "@/fixtures/timeEntries";

import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  client: string;
  billable: boolean;
  timeInterval: string;
  totalTime: string;
}

export const TimeEntry = ({
  client,
  billable,
  timeInterval,
  totalTime,
}: TimeEntryProps) => {
  return (
    <li className={styles.timeEntry}>
      <div className={styles.timeEntryHeader}>
        <div className={styles.timeEntryTitle}>
          <h3>{client}</h3>
          <span>{billable ? "Billable" : "Non-billable"}</span>
          <span>{timeInterval}</span>
          <span>{totalTime}</span>
        </div>
      </div>
    </li>
  );
};
