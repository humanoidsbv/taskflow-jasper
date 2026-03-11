import Image from "next/image";
import Link from "next/link";

import deleteIcon from "@/public/icons/delete.svg";
import greenIcon from "@/public/icons/ellipse-green.svg";
import redIcon from "@/public/icons/ellipse-red.svg";

import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  data: {
    billable: boolean;
    client: string;
    department: string;
    timeInterval: string;
    totalTime: string;
  };
}

export const TimeEntry = ({ data }: TimeEntryProps) => {
  return (
    <li className={`${styles.timeEntry} ${styles[`${data.department}`]}`}>
      <div className={styles["time-entry-title"]}>
        <h3 className={styles["client"]}>{data.client}</h3>
        <div className={styles.billableArea}>
          <Image alt="" src={data.billable ? greenIcon : redIcon} />
          <span
            className={data.billable ? styles["billable"] : styles.nonBillable}
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
          <Image alt="" src={deleteIcon} />
        </Link>
      </div>
    </li>
  );
};
