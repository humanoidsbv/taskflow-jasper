import { ReactNode } from "react";

import { TimeEntry } from "../time-entry/TimeEntry";

import styles from "./Filters.module.css";

interface FiltersProps {
  filters: {
    filterTitle: string;
    filterValue: string;
    filterPlaceholder: string;
  }[];

  timeEntries?: (typeof TimeEntry)[];
  //   memberEntries?: (typeof MemberEntry)[];
}

export const Filters = ({ filters, timeEntries }: FiltersProps) => {
  return <div className={styles.filters}></div>;
};
