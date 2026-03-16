"use client";

import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "./actions";

import styles from "./TimeEntryForm.module.css";
import { useState } from "react";
import { formatHours, getElapsedTime } from "@/utils/utils";

interface TimeEntryFormProps {
  closeModal: () => void;
}

const activityOptions = [
  { value: "design-billable", placeholder: "Design (billable)" },
  { value: "design-nonBillable", placeholder: "Design (non-billable)" },
  { value: "development-billable", placeholder: "Development (billable)" },
  {
    value: "development-nonBillable",
    placeholder: "Development (non-billable)",
  },
];

export const TimeEntryForm = ({ closeModal }: TimeEntryFormProps) => {
  const [totalHours, setTotalHours] = useState("00:00");

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const startDate = new Date(
      `2026-01-01T${formData.get("startDate") || "00:00"}`,
    );
    const stopDate = new Date(
      `2026-01-01T${formData.get("stopDate") || "00:00"}`,
    );

    const elapsedHours = formatHours(getElapsedTime(startDate, stopDate));

    setTotalHours(elapsedHours);
  }

  return (
    <Form
      action={createCalendarEvent}
      onChange={handleChange}
      className={styles.container}
    >
      <span className={styles.title}>New event</span>
      <label className={styles.long}>
        Client
        <input name="client" required type="text" />
      </label>
      <label className={styles.long}>
        Activity
        <select name="activity" required>
          {activityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.placeholder}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.long}>
        Date
        <input name="date" required type="date" />
      </label>
      <label className={styles.short}>
        From
        <input name="startDate" required type="time" />
      </label>
      <label className={styles.short}>
        To
        <input name="stopDate" required type="time" />
      </label>
      <div className={styles.totalHours}>
        <span className={styles.hoursText}>Total</span>
        <span className={styles.hoursValue}>{totalHours}</span>
      </div>
      <Button variant="secondary" onClick={closeModal}>
        Cancel
      </Button>
      <Button type="submit">Add event</Button>
    </Form>
  );
};
