import Link from "next/link";

import { formatTimeEntryData } from "./helpers";
import DeleteIcon from "@/public/icons/delete.svg";
import EllipseIcon from "@/public/icons/ellipse.svg";
import type { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";

import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  data: CreatedTimeEntry;
  onDelete: (data: CreatedTimeEntry) => Promise<void>;
}

export const TimeEntry = ({ data, onDelete }: TimeEntryProps) => {
  const { billable, client, department, timeInterval, totalTime } =
    formatTimeEntryData(data);

  return (
    <li
      className={`${styles.timeEntry} ${styles[`${department}`]}`}
      tabIndex={0}
    >
      <div className={styles.left}>
        <h3 className={styles.client}>{client}</h3>
        <EllipseIcon
          className={`${styles.billableIcon} ${billable ? styles.billable : styles.nonBillable}`}
          alt=""
        />
        <span
          className={`${styles.billableArea} ${billable ? styles.billable : styles.nonBillable}`}
        >
          {billable ? "Billable" : "Non-billable"}
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.timeInterval}>{timeInterval}</span>
        <span className={styles.totalTime}>{totalTime}</span>
        <button onClick={() => onDelete(data)} className={styles.delete}>
          <DeleteIcon alt={`Delete this entry of ${client}`} />
        </button>
      </div>
    </li>
  );
};
