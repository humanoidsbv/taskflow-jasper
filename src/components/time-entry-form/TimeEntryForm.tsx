"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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

const initialState = {
  message: "",
  errors: [],
};

export const TimeEntryForm = ({ onCancel }: TimeEntryFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [totalHours, setTotalHours] = useState("00:00");
  const [state, formAction, pending] = useActionState(
    createCalendarEvent,
    initialState,
  );
  const [pendingString, setPendingString] = useState("");
  const pendingTimeoutRef = useRef<number | null>(null);

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const baseDate = new Date().toDateString();
    const [startTime, stopTime] = ["startTime", "stopTime"].map(
      (key) => new Date(`${baseDate} ${formData.get(key) || "00:00"}`),
    );
    const elapsedHours = formatHours(getElapsedTime(startTime, stopTime));

    setTotalHours(elapsedHours);
    setCanSubmit(event.currentTarget.checkValidity());
  }

  useEffect(() => {
    console.table({
      pending,
      errors: state.errors,
      pendingString,
    });
    if (!pending && !state.errors) {
      onCancel();
      setTotalHours("00:00");
    }
    if (pending && pendingString === "") {
      pendingTimeoutRef.current = window.setTimeout(() => {
        setPendingString("Pending submission...");
      }, 1000);
    }
    if (!pending && pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      setPendingString("");
    }
  }, [pending, onCancel]);

  return (
    <Form
      action={formAction}
      className={styles.container}
      onChange={handleChange}
    >
      <h2 className={styles.title}>New event</h2>
      <InputField
        name="client"
        placeholder="Client"
        required
        title="Date"
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
          max="9999-12-12"
        />
        <InputField
          className={styles.timeField}
          name="startTime"
          required
          title="From"
          type="time"
        />
        <InputField
          className={styles.timeField}
          name="stopTime"
          required
          title="To"
          type="time"
          inputRef={inputRef}
        />
        <div className={styles.totalHours}>
          <span className={`${styles.label} ${styles.total}`}>Total</span>
          <span className={styles.hours}>{totalHours}</span>
        </div>
      </div>
      <p
        aria-live="polite"
        className={`${styles.message} ${state.errors ? styles.error : styles.confirm} ${pending && styles.pending}`}
      >
        {pending ? pendingString : state.message}
      </p>
      <div className={styles.buttons}>
        <Button
          className={styles.cancelButton}
          variant="secondary"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!canSubmit || pending}>
          Add event
        </Button>
      </div>
    </Form>
  );
};
