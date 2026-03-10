import Link from "next/link";

import { timeEntries } from "@/fixtures/timeEntries";

import styles from "./TimeEntry.module.css";
import Image from "next/image";
import greenIcon from "@/public/icons/ellipse-green.svg";
import redIcon from "@/public/icons/ellipse-red.svg";
import deleteIcon from "@/public/icons/delete.svg";

interface TimeEntryProps {
  data: {
    client: string;
    billable: boolean;
    timeInterval: string;
    totalTime: string;
    department: string;
  };
}

export const TimeEntry = ({ data }: TimeEntryProps) => {
  return (
    <li className={`${styles.timeEntry} ${styles[`${data.department}`]}`}>
      <div className={styles.timeEntryTitle}>
        <h3 className={styles.client}>{data.client}</h3>
        <div className={styles.billableArea}>
          <Image src={data.billable ? greenIcon : redIcon} alt="" />
          <span
            className={data.billable ? styles.billable : styles.nonBillable}
          >
            {data.billable ? "Billable" : "Non-billable"}
          </span>
        </div>
      </div>
      <div className={styles.timeContainer}>
        <div className={styles.timeArea}>
          <span className={styles.timeInterval}>{data.timeInterval}</span>
          <span className={styles.totalTime}>{data.totalTime}</span>
        </div>
        <Link href="">
          <Image src={deleteIcon} alt="" />
        </Link>
      </div>
    </li>
  );
};
