import { Filters } from "../filters/Filters";
import { TimeEntry } from "../time-entry/TimeEntry";

import { timeEntries } from "@/services/timeEntries";
import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntries: typeof timeEntries;
}

export const TimeEntries = ({ timeEntries }: TimeEntriesProps) => {
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
