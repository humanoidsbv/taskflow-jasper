import Image from "next/image";
import Link from "next/link";

import deleteIcon from "@/public/icons/delete.svg";
import greenIcon from "@/public/icons/ellipse-green.svg";
import redIcon from "@/public/icons/ellipse-red.svg";
import type { TimeEntryData } from "@/types/dataTypes";

import { formatTimeEntryData } from "./helpers";
import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  data: TimeEntryData;
}

export const TimeEntry = ({ data }: TimeEntryProps) => {
  const { department, client, billable, totalTime, timeInterval } =
    formatTimeEntryData(data);

  return (
    <li className={`${styles.timeEntry} ${styles[`${department}`]}`}>
      <div>
        <h3 className={styles.client}>{client}</h3>
        <div className={styles.billableArea}>
          <Image alt="" src={billable ? greenIcon : redIcon} />
          <span className={billable ? styles.billable : styles.nonBillable}>
            {billable ? "Billable" : "Non-billable"}
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.time}>
          <span className={styles.timeInterval}>{timeInterval}</span>
          <span className={styles.totalTime}>{totalTime}</span>
        </div>
        <Link href="">
          <Image alt="" src={deleteIcon} />
        </Link>
      </div>
    </li>
  );
};
