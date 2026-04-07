"use client";

import Form from "next/form";
import { RefObject, useActionState } from "react";

import { createMemberEvent } from "@/services/actions";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/input-field";
import photo from "@/public/images/Eric.jpeg";

import styles from "@/components/time-entry-form/TimeEntryForm.module.css";
import Image from "next/image";

interface MemberFormProps {
  modalRef: RefObject<HTMLDialogElement | null>;
}

const initialState = {
  message: "",
  errors: {} as Partial<
    Record<
      "firstName" | "lastName" | "eMail" | "position" | "info" | "client",
      string[]
    >
  >,
  values: {} as Partial<
    Record<
      | "firstName"
      | "lastName"
      | "eMail"
      | "position"
      | "info"
      | "client"
      | "id",
      string
    >
  >,
};

export const MemberForm = ({ modalRef }: MemberFormProps) => {
  const [state, formAction, pending] = useActionState(
    createMemberEvent,
    initialState,
  );
  const closeModal = () => modalRef.current?.close();

  return (
    <Form action={formAction} className={styles.container}>
      <h2 className={styles.title}>New member</h2>
      <div className={styles.photoArea}>
        <Image src={photo} alt="" className={styles.photo} />
        <span className={styles.photoText}>Edit Avatar</span>
      </div>
      <div className={styles.nameContainer}>
        <InputField
          defaultValue={state?.values?.firstName}
          disabled={pending}
          className={styles.wide}
          name="firstName"
          placeholder="Eric"
          required
          title="First name"
          type="text"
        />
        <InputField
          defaultValue={state?.values?.lastName}
          disabled={pending}
          className={styles.wide}
          name="lastName"
          placeholder="Clapton"
          required
          title="Last name"
          type="text"
        />
      </div>
      <InputField
        defaultValue={state?.values?.eMail}
        disabled={pending}
        name="eMail"
        placeholder="eric.clapton@humanoids.nl"
        required
        title="E-mail address"
        type="email"
      />
      <InputField
        defaultValue={state?.values?.position}
        disabled={pending}
        name="position"
        placeholder="Front-end Developer"
        required
        title="Position"
        type="text"
      />
      <InputField
        defaultValue={state?.values?.info}
        disabled={pending}
        name="info"
        placeholder="Extra info"
        title="Info"
        type="text"
      />
      <InputField
        defaultValue={state?.values?.client}
        disabled={pending}
        name="client"
        placeholder="Humanoids"
        required
        title="Current client"
        type="text"
      />
      <div className={styles.buttons}>
        <Button
          className={styles.cancelButton}
          onClick={closeModal}
          type="button"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          Add member
        </Button>
      </div>
    </Form>
  );
};
