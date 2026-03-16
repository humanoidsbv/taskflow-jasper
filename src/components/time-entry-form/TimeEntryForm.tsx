"use client";

import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "./actions";

import styles from "./TimeEntryForm.module.css";
import { useState } from "react";

interface TimeEntryFormProps {
  closeModal: () => void;
}

export const TimeEntryForm = ({ closeModal }: TimeEntryFormProps) => {
  const [totalHours, setTotalHours] = useState("00:00");

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    setTotalHours("01:00");
    console.log(formData);
  }

  return (
    <>
      <span className={styles.title}>New event</span>
      <Form action={createCalendarEvent} onChange={handleChange}>
        <input name="client" required type="text" />
        <input name="activity" required type="text" />
        <input name="date" type="date" />
        <input name="fromDate" type="time" />
        <input name="toDate" type="time" />
        <span>{totalHours}</span>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Add event</Button>
      </Form>
    </>
  );
};
