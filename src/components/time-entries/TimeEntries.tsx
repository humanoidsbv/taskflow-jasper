"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import { createTimeEntry, deleteTimeEntry } from "@/services/timeEntries";
import { formatHeader } from "./helpers";
import { formatHours, getElapsedTime } from "@/utils/utils";
import { TimeEntry } from "@/components/time-entry/TimeEntry";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./TimeEntries.module.css";

interface TimeEntriesProps {
  timeEntries: CreatedTimeEntry[];
}

export const TimeEntries = ({ timeEntries }: TimeEntriesProps) => {
  const totalHoursByDay = timeEntries.reduce<Record<string, number>>(
    (acc, item) => {
      const date = new Date(item.startTimestamp).toLocaleDateString();
      const elapsedHours = getElapsedTime(
        new Date(item.startTimestamp),
        new Date(item.stopTimestamp),
      );
      acc[date] = (acc[date] || 0) + elapsedHours;
      return acc;
    },
    {},
  );

  const deleteEntry = async (data: CreatedTimeEntry) => {
    if (!window.confirm(`Are you sure you want to delete ${data.client}?`))
      return;

    const response = await deleteTimeEntry(data.id);

    toast(`Event deleted: ${response.client}`, {
      duration: 5000,
      className: "toastSuccess",
      action: {
        label: "Undo",
        onClick: async () => {
          await createTimeEntry(response as TimeEntryData);
          const id = crypto.randomUUID();
          toast(`Event restored: ${response?.client}`, {
            id,
            className: "toastSuccess",
            cancel: (
              <CloseIcon
                alt="Close message"
                onClick={() => toast.dismiss(id)}
              />
            ),
          });
        },
      },
    });
  };

  return (
    <ul>
      {timeEntries.map((entry, index, timeEntries) => {
        const today = new Date(entry.startTimestamp).toLocaleDateString();
        const hasHeader =
          index === 0 ||
          today !==
            new Date(
              timeEntries[index - 1].startTimestamp,
            ).toLocaleDateString();

        return (
          <Fragment key={entry.id}>
            {hasHeader && (
              <div className={styles.container}>
                <h2 className={styles.content}>{formatHeader(entry)}</h2>
                <span className={styles.content}>
                  {formatHours(totalHoursByDay[today])}
                </span>
              </div>
            )}
            <TimeEntry data={entry} onDelete={deleteEntry} />
          </Fragment>
        );
      })}
    </ul>
  );
};
