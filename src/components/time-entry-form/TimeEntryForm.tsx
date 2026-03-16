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
    <>
      <span className={styles.title}>New event</span>
      <Form action={createCalendarEvent} onChange={handleChange}>
        <input name="client" required type="text" />
        <select name="activity" required>
          {activityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.placeholder}
            </option>
          ))}
        </select>
        <input name="date" required type="date" />
        <input name="startDate" required type="time" />
        <input name="stopDate" required type="time" />
        <span className={styles.totalHours}>{totalHours}</span>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Add event</Button>
      </Form>
    </>
  );
};
