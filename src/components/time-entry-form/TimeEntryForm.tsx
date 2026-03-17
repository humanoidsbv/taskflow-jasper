"use client";

import { useState } from "react";
import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "@/services/actions";
import { formatHours, getElapsedTime } from "@/utils/utils";
import { InputField } from "@/components/input-field/InputField";
import { SelectField } from "@/components/input-field/SelectField";

import styles from "./TimeEntryForm.module.css";

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
      className={styles.container}
      onChange={handleChange}
      onSubmit={onCancel}
    >
      <h2 className={styles.title}>New event</h2>
      <InputField
        name="client"
        placeholder="Client"
        required
        title="Date Test"
        type="text"
      />
      <SelectField title="Activity" name="activity">
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.placeholder}
          </option>
        ))}
      </SelectField>
      <div className={styles.timeContainer}>
        <InputField
          className={styles.date}
          name="date"
          required
          title="Date"
          type="date"
        />
        <InputField
          className={styles.timeField}
          name="startDate"
          required
          title="From"
          type="time"
        />
        <InputField
          className={styles.timeField}
          name="stopDate"
          required
          title="To"
          type="time"
        />
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
