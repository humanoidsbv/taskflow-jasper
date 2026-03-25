"use client";

import { Fragment } from "react";

import { formatHeader } from "./helpers";
import { formatHours, getElapsedTime } from "@/utils/utils";
import { TimeEntry } from "@/components/time-entry/TimeEntry";
import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./TimeEntries.module.css";
import { deleteCalendarEvent } from "@/services/actions";
import { toast } from "sonner";
import { createTimeEntry } from "@/services/timeEntries";

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
    if (window.confirm(`Are you sure you want to delete ${data.client}?`)) {
      const response = await deleteCalendarEvent(data.id);
      const toastId = toast(`Event deleted: ${response.values?.client}`, {
        duration: 5000,
        className: "toastSuccess",
        action: {
          label: "Undo",
          onClick: async () => {
            await createTimeEntry(response.values as TimeEntryData);
            const toastId = toast(
              `Event restored: ${response.values?.client}`,
              {
                className: "toastSuccess",
                cancel: (
                  <CloseIcon
                    alt="Close message"
                    onClick={() => toast.dismiss(toastId)}
                  />
                ),
              },
            );
          },
        },
      });
    }
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
