import Image from "next/image";
import Link from "next/link";

import deleteIcon from "@/public/icons/delete.svg";
import greenIcon from "@/public/icons/ellipse-green.svg";
import redIcon from "@/public/icons/ellipse-red.svg";

import styles from "./TimeEntry.module.css";
import { FormattedTimeEntryType } from "@/types/dataTypes";

interface TimeEntryProps {
  data: FormattedTimeEntryType;
}

export const TimeEntry = ({
  data: { department, client, billable, timeInterval, totalTime },
}: TimeEntryProps) => {
  return (
    <li className={`${styles.timeEntry} ${styles[`${department}`]}`}>
      <div className={styles["time-entry-title"]}>
        <h3 className={styles["client"]}>{client}</h3>
        <div className={styles.billableArea}>
          <Image alt="" src={billable ? greenIcon : redIcon} />
          <span className={billable ? styles["billable"] : styles.nonBillable}>
            {billable ? "Billable" : "Non-billable"}
          </span>
        </div>
      </div>
      <div className={styles.timeContainer}>
        <div className={styles.timeArea}>
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
