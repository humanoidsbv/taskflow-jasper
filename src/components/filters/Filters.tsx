import { teamMembers } from "@/services/teamMembers";
import { timeEntries } from "../../../fixtures/timeEntries";

import styles from "./Filters.module.css";

interface FiltersProps {
  filters: {
    filterTitle: string;
    filterValue: string;
    filterPlaceholder: string;
  }[];

  timeEntries?: typeof timeEntries;
  teamMembers?: typeof teamMembers;
}

export const Filters = ({
  filters,
  timeEntries,
  teamMembers,
}: FiltersProps) => {
  return <div className={styles.filters}></div>;
};
