import Link from "next/link";

import { formatTimeEntryData } from "./helpers";
import DeleteIcon from "@/public/icons/delete.svg";
import EllipseIcon from "@/public/icons/ellipse.svg";
import type { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./TimeEntry.module.css";
import { deleteCalendarEvent } from "@/services/actions";
import { createTimeEntry, deleteTimeEntry } from "@/services/timeEntries";
import { toast } from "sonner";
import { Button } from "../button/Button";
import { dateFormat } from "@/utils/utils";

interface TimeEntryProps {
  data: CreatedTimeEntry;
}

export const TimeEntry = ({ data }: TimeEntryProps) => {
  const { billable, client, department, timeInterval, totalTime } =
    formatTimeEntryData(data);

  async function deleteEntry() {
    if (window.confirm(`Are you sure you want to delete ${data.client}?`)) {
      const response = await deleteCalendarEvent(data.id);
      const toastId = toast(`Event deleted: ${response.values?.client}`, {
        duration: 5000,
        className: "toastSuccess",
        action: {
          label: "Undo",
          onClick: async () => {
            await createTimeEntry(response.values as TimeEntryData);
            toast(`Event restored: ${response.values?.client}`, {
              className: "toastSuccess",
            });
          },
        },
        cancel: (
          <CloseIcon
            alt="Close message"
            onClick={() => toast.dismiss(toastId)}
          />
        ),
      });
    }
  }

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
        <button onClick={deleteEntry} className={styles.delete}>
          <DeleteIcon alt={`Delete this entry of ${client}`} />
        </button>
      </div>
    </li>
  );
};
