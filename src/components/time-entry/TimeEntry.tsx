import Link from "next/link";

import { formatTimeEntryData } from "./helpers";
import DeleteIcon from "@/public/icons/delete.svg";
import EllipseIcon from "@/public/icons/ellipse.svg";
import type { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./TimeEntry.module.css";
import { deleteCalendarEvent } from "@/services/actions";
import { deleteTimeEntry } from "@/services/timeEntries";
import { toast } from "sonner";
import { Button } from "../button/Button";

interface TimeEntryProps {
  data: CreatedTimeEntry;
}

export const TimeEntry = ({ data }: TimeEntryProps) => {
  const { billable, client, department, timeInterval, totalTime } =
    formatTimeEntryData(data);

  async function deleteEntry() {
    const response = await deleteCalendarEvent(data.id);
    const toastId = toast("Event deleted", {
      duration: 16000,
      className: "toastSuccess",
      cancel: (
        <CloseIcon alt="Close message" onClick={() => toast.dismiss(toastId)} />
      ),
    });
  }

  return (
    <li className={`${styles.timeEntry} ${styles[`${department}`]}`}>
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
        <button onClick={deleteEntry} className={styles.delete}>
          <DeleteIcon alt={`Delete this entry of ${client}`} />
        </button>
      </div>
    </li>
  );
};
