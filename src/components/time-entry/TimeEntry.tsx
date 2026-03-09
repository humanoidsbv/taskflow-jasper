import { timeEntries } from "@/fixtures/timeEntries";

import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  data: {
    client: string;
    billable: boolean;
    timeInterval: string;
    totalTime: string;
  };
}

export const TimeEntry = ({ data }: TimeEntryProps) => {
  return (
    <li className={styles.timeEntry}>
      <div className={styles.timeEntryHeader}>
        <div className={styles.timeEntryTitle}>
          <h3>{data.client}</h3>
          <span>{data.billable ? "Billable" : "Non-billable"}</span>
          <span>{data.timeInterval}</span>
          <span>{data.totalTime}</span>
        </div>
      </div>
    </li>
  );
};
