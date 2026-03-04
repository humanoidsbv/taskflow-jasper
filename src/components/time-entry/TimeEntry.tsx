import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
}

export const TimeEntry = () => {
  return (
    <li className={styles.timeEntry}>
      <div className={styles.timeEntryHeader}>
        <div className={styles.timeEntryTitle}>
          <h3>Time Entry Title</h3>
        </div>
      </div>
    </li>
  );
};
