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
    <li className={`${styles["time-entry"]} ${styles[`${data.department}`]}`}>
      <div className={styles["time-entry-title"]}>
        <h3 className={styles["client"]}>{data.client}</h3>
        <div className={styles["billable-area"]}>
          <Image alt="" src={data.billable ? greenIcon : redIcon} />
          <span
            className={
              data.billable ? styles["billable"] : styles["non-billable"]
            }
          >
            {data.billable ? "Billable" : "Non-billable"}
          </span>
        </div>
      </div>
      <div className={styles["time-container"]}>
        <div className={styles["time-area"]}>
          <span className={styles["time-interval"]}>{data.timeInterval}</span>
          <span className={styles["total-time"]}>{data.totalTime}</span>
        </div>
        <Link href="">
          <Image alt="" src={deleteIcon} />
        </Link>
      </div>
    </li>
  );
};
