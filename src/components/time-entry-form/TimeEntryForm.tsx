"use client";

import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "../../../services/actions";

import styles from "./TimeEntryForm.module.css";
import { useState } from "react";
import { formatHours, getElapsedTime } from "@/utils/utils";

interface TimeEntryFormProps {
  onCancel: () => void;
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

export const TimeEntryForm = ({ onCancel }: TimeEntryFormProps) => {
  const [totalHours, setTotalHours] = useState("00:00");

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const baseDate = new Date().toDateString();
    const [startDate, stopDate] = ["startDate", "stopDate"].map(
      (key) => new Date(`${baseDate} ${formData.get(key) || "00:00"}`),
    );
    const elapsedHours = formatHours(getElapsedTime(startDate, stopDate));

    setTotalHours(elapsedHours);
  }

  return (
    <Form
      action={createCalendarEvent}
      onChange={handleChange}
      className={styles.container}
      onSubmit={onCancel}
      formMethod=""
    >
      <span className={styles.title}>New event</span>
      <label className={styles.labelField}>
        <span className={styles.label}>Client</span>
        <input
          className={styles.inputField}
          name="client"
          required
          type="text"
          placeholder="Client"
        />
      </label>
      <label className={styles.labelField}>
        <span className={styles.label}>Activity</span>
        <select className={styles.inputField} name="activity" required>
          {activityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.placeholder}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.timeContainer}>
        <label className={`${styles.labelField} ${styles.date}`}>
          <span className={styles.label}>Date</span>
          <input
            className={styles.inputField}
            name="date"
            required
            type="date"
          />
        </label>
        <label className={`${styles.labelField} ${styles.timeField}`}>
          <span className={styles.label}>From</span>
          <input
            className={styles.inputField}
            name="startDate"
            required
            type="time"
          />
        </label>
        <label className={`${styles.labelField} ${styles.timeField}`}>
          <span className={styles.label}>To</span>
          <input
            className={styles.inputField}
            name="stopDate"
            required
            type="time"
          />
        </label>
        <div className={styles.totalHours}>
          <span className={`${styles.label} ${styles.total}`}>Total</span>
          <span className={styles.hours}>{totalHours}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.cancelButton}
          variant="secondary"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit">Add event</Button>
      </div>
    </Form>
  );
};
