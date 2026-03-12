import Image from "next/image";
import Link from "next/link";

import { formatElapsedTime, timeFormat } from "@/utils/utils";
import { FormattedTimeEntryType, TimeEntryType } from "@/types/dataTypes";
import deleteIcon from "@/public/icons/delete.svg";
import greenIcon from "@/public/icons/ellipse-green.svg";
import redIcon from "@/public/icons/ellipse-red.svg";

import styles from "./TimeEntry.module.css";

interface TimeEntryProps {
  data: TimeEntryType;
}

const formatTimeEntryData = ({
  startTimestamp,
  stopTimestamp,
  ...props
}: TimeEntryType): FormattedTimeEntryType => {
  const startDate = new Date(startTimestamp);
  const stopDate = new Date(stopTimestamp);
  const totalTime = formatElapsedTime(startDate, stopDate);
  const timeInterval = `${timeFormat.format(startDate)} - ${timeFormat.format(stopDate)}`;

  return {
    timeInterval,
    totalTime,
    ...props,
  };
};

export const TimeEntry = ({ data }: TimeEntryProps) => {
  const { department, client, billable, totalTime, timeInterval } =
    formatTimeEntryData(data);

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
