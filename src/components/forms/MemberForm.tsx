"use client";

import { RefObject, useActionState, useEffect } from "react";
import Form from "next/form";
import Image from "next/image";

import { Button } from "@/components/button/Button";
import { createMemberEvent } from "@/services/actions";
import { InputField } from "@/components/input-field";
import { showCreatedToast } from "./helpers";
import photo from "@/public/images/Eric.jpeg";

import styles from "./MemberForm.module.css";

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
  const isModalOpen = modalRef.current?.open;
  const closeModal = () => modalRef.current?.close();

  useEffect(() => {
    if (pending || !isModalOpen) return;
    if (Object.keys(state.errors).length !== 0) {
      showCreatedToast("toastFailure", state.message);
    } else {
      closeModal();
      showCreatedToast("toastSuccess");
    }
  }, [pending]);

  return (
    <Form action={formAction} className={styles.container}>
      <h2 className={styles.title}>New member</h2>
      <div className={styles.photoArea}>
        <Image src={photo} alt="" className={styles.photo} />
        <span className={styles.photoText}>Edit Avatar</span>
      </div>
      <div className={styles.nameContainer}>
        <InputField
          className={styles.wide}
          defaultValue={state?.values?.firstName}
          disabled={pending}
          error={state.errors.firstName}
          name="firstName"
          placeholder="Eric"
          required
          title="First name"
          type="text"
        />
        <InputField
          className={styles.wide}
          defaultValue={state?.values?.lastName}
          disabled={pending}
          error={state.errors.lastName}
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
        error={state.errors.eMail}
        name="eMail"
        placeholder="eric.clapton@humanoids.nl"
        required
        title="E-mail address"
        type="email"
      />
      <InputField
        defaultValue={state?.values?.position}
        disabled={pending}
        error={state.errors.position}
        name="position"
        placeholder="Front-end Developer"
        required
        title="Position"
        type="text"
      />
      <InputField
        defaultValue={state?.values?.info}
        disabled={pending}
        error={state.errors.info}
        name="info"
        placeholder="Extra info"
        title="Info"
        type="text"
      />
      <InputField
        defaultValue={state?.values?.client}
        disabled={pending}
        error={state.errors.client}
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
