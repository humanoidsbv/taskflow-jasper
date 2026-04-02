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
  return (
    <Form action={formAction} className={styles.container}>
      <h2 className={styles.title}>New member</h2>
      <div className={styles.photoArea}>
        <Image src={photo} alt="" className={styles.photo} />
        <span className={styles.photoText}>Edit Avatar</span>
      </div>
      <InputField
        defaultValue={state?.values?.client}
        disabled={pending}
        name="firstName"
        placeholder="Eric"
        required
        title="First name"
        type="text"
      />
      <InputField
        defaultValue={state?.values?.client}
        disabled={pending}
        name="lastName"
        placeholder="Clapton"
        required
        title="Last name"
        type="text"
      />
      <InputField
        defaultValue={state?.values?.client}
        disabled={pending}
        name="firstName"
        placeholder="First name"
        required
        title="First name"
        type="email"
      />
      <Button type="submit">Hello</Button>
    </Form>
  );
};
