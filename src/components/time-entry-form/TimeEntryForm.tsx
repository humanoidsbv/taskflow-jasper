"use client";

import { toast } from "sonner";
import { RefObject, useActionState, useEffect, useRef, useState } from "react";
import Form from "next/form";

import { Button } from "@/components/button/Button";
import { createCalendarEvent } from "@/services/actions";
import { formatHours, getElapsedTime } from "@/utils/utils";
import { InputField } from "@/components/input-field/InputField";
import { SelectField } from "@/components/input-field/SelectField";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./TimeEntryForm.module.css";

interface TimeEntryFormProps {
  modalRef: RefObject<HTMLDialogElement | null>;
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
    Record<
      "client" | "activity" | "date" | "startTime" | "stopTime" | "id",
      string
    >
  >,
};

export const TimeEntryForm = ({ modalRef }: TimeEntryFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [totalHours, setTotalHours] = useState("00:00");
  const [state, formAction, pending] = useActionState(
    createCalendarEvent,
    initialState,
  );
  const isModalOpen = modalRef.current?.open;

  const closeModal = () => modalRef.current?.close();

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const baseDate = new Date().toDateString();
    const [startTime, stopTime] = ["startTime", "stopTime"].map(
      (key) => new Date(`${baseDate} ${formData.get(key) || "00:00"}`),
    );
    const elapsedHours = formatHours(getElapsedTime(startTime, stopTime));

    setTotalHours(elapsedHours);
  }

  function showCreatedToast(className: string) {
    const toastId = toast("New event added", {
      duration: 5000,
      className,
      cancel: (
        <CloseIcon alt="Close message" onClick={() => toast.dismiss(toastId)} />
      ),
    });
  }

  useEffect(() => {
    if (!pending && Object.keys(state.errors).length !== 0 && !isModalOpen) {
      showCreatedToast("toastFailure");
    }
    if (!pending && Object.keys(state.errors).length === 0 && isModalOpen) {
      closeModal();
      showCreatedToast("toastSuccess");
      setTotalHours("00:00");
    }
  }, [pending]);

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
        disabled={pending}
      />
      {state.errors.client && <span>{state.errors.client}</span>}
      <SelectField
        title="Activity"
        name="activity"
        defaultValue={state?.values?.activity}
        disabled={pending}
      >
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.placeholder}
          </option>
        ))}
      </SelectField>
      {state.errors.activity && <span>{state.errors.activity}</span>}
      <div className={styles.timeContainer}>
        <InputField
          className={styles.date}
          name="date"
          required
          title="Date"
          type="date"
          max="9999-12-12"
          defaultValue={state?.values?.date}
          disabled={pending}
        />
        {state.errors.date && <span>{state.errors.date}</span>}
        <InputField
          className={styles.timeField}
          name="startTime"
          required
          title="From"
          type="time"
          defaultValue={state?.values?.startTime}
          disabled={pending}
        />
        {state.errors.startTime && <span>{state.errors.startTime}</span>}
        <InputField
          className={styles.timeField}
          name="stopTime"
          required
          title="To"
          type="time"
          inputRef={inputRef}
          defaultValue={state?.values?.stopTime}
          disabled={pending}
        />
        {state.errors.stopTime && <span>{state.errors.stopTime}</span>}
        <div className={styles.totalHours}>
          <span className={`${styles.label} ${styles.total}`}>Total</span>
          <span className={styles.hours}>{totalHours}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.cancelButton}
          variant="secondary"
          onClick={closeModal}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          Add event
        </Button>
      </div>
    </Form>
  );
};
