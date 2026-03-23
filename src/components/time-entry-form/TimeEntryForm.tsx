"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "@/services/actions";
import { formatHours, getElapsedTime } from "@/utils/utils";
import { InputField } from "@/components/input-field/InputField";
import { SelectField } from "@/components/input-field/SelectField";

import styles from "./TimeEntryForm.module.css";
import { useRouter } from "next/navigation";

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
  errors: {} as Partial<
    Record<"client" | "activity" | "date" | "startTime" | "stopTime", string[]>
  >,
  values: {} as Partial<
    Record<"client" | "activity" | "date" | "startTime" | "stopTime", string>
  >,
};

export const TimeEntryForm = ({ onCancel }: TimeEntryFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [canSubmit, setCanSubmit] = useState(true);
  const [totalHours, setTotalHours] = useState("00:00");
  const [state, formAction, pending] = useActionState(
    createCalendarEvent,
    initialState,
  );

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const baseDate = new Date().toDateString();
    const [startTime, stopTime] = ["startTime", "stopTime"].map(
      (key) => new Date(`${baseDate} ${formData.get(key) || "00:00"}`),
    );
    const elapsedHours = formatHours(getElapsedTime(startTime, stopTime));

    setTotalHours(elapsedHours);
  }

  useEffect(() => {
    if (!pending && Object.keys(state.errors).length === 0) {
      onCancel();
      setTotalHours("00:00");
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
        title="Client"
        type="text"
        defaultValue={state?.values?.client}
      />
      <SelectField
        title="Activity"
        name="activity"
        defaultValue={state?.values?.activity}
      >
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
          defaultValue={state?.values?.date}
        />
        <InputField
          className={styles.timeField}
          name="startTime"
          required
          title="From"
          type="time"
          defaultValue={state?.values?.startTime}
        />
        <InputField
          className={styles.timeField}
          name="stopTime"
          required
          title="To"
          type="time"
          inputRef={inputRef}
          defaultValue={state?.values?.stopTime}
        />
        <div className={styles.totalHours}>
          <span className={`${styles.label} ${styles.total}`}>Total</span>
          <span className={styles.hours}>{totalHours}</span>
        </div>
      </div>
      <p
        aria-live="polite"
        className={`${styles.message} ${
          state.errors ===
          ({} as Partial<
            Record<
              "client" | "activity" | "date" | "startTime" | "stopTime",
              string[]
            >
          >)
            ? styles.error
            : styles.confirm
        } ${pending && styles.pending}`}
      >
        {pending ? "" : state.message}
        {state?.errors?.startTime && <p>{state.errors?.stopTime?.[0]}</p>}
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
