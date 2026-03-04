import { TimeEntry } from "../time-entry/TimeEntry";
import styles from "./TimeEntries.module.css";

export const TimeEntries = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>FiltersContainer</div>
      <div className={styles.entries}>
        <ul>
          <TimeEntry />
          <TimeEntry />
          <TimeEntry />
        </ul>
      </div>
    </div>
  );
};
