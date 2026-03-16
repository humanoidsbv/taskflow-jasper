"use client";

import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "./actions";

import styles from "./TimeEntryForm.module.css";

interface TimeEntryFormProps {
  closeModal: () => void;
}

export const TimeEntryForm = ({ closeModal }: TimeEntryFormProps) => {
  return (
    <>
      <span className={styles.title}>New event</span>
      <Form action={createCalendarEvent}>
        <input name="client" required type="text" />
        <input name="activity" required type="text" />
        <input name="date" type="text" />
        <input name="fromDate" type="text" />
        <input name="toDate" type="text" />
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Add event</Button>
      </Form>
    </>
  );
};
