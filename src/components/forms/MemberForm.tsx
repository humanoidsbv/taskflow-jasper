"use client";

import { RefObject, useActionState, useEffect } from "react";
import Form from "next/form";
import Image from "next/image";

import { Button } from "@/components/button/Button";
import { createMemberEvent, editMemberEvent } from "@/services/actions";
import { InputField } from "@/components/input-field";
import { showCreatedToast } from "./helpers";
import photo from "@/public/images/Eric.jpeg";

import styles from "./TimeEntryForm.module.css";
import { CreatedMember } from "@/types/dataTypes";

interface MemberFormProps {
  modalRef: RefObject<HTMLDialogElement | null>;
  memberData?: CreatedMember;
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

export const MemberForm = ({ modalRef, memberData }: MemberFormProps) => {
  const [state, formAction, pending] = useActionState(
    memberData ? editMemberEvent : createMemberEvent,
    initialState,
  );
  const closeModal = () => modalRef.current?.close();

  useEffect(() => {
    if (pending || !modalRef.current?.open) return;
    if (Object.keys(state.errors).length !== 0) {
      showCreatedToast("toastFailure", state.message);
    } else {
      closeModal();
      showCreatedToast(
        "toastSuccess",
        `${memberData ? "Member edited" : "New member added"}`,
      );
    }
  }, [pending]);

  return (
    <Form action={formAction} className={styles.container}>
      {memberData && (
        <>
          <input type="hidden" name="id" defaultValue={memberData.id} />
          <input
            type="hidden"
            name="startingDate"
            defaultValue={memberData.startingDate}
          />
        </>
      )}
      <h2 className={styles.title}>
        {memberData ? "Edit member" : "New member"}
      </h2>
      <div className={styles.photoArea}>
        <Image src={photo} alt="" className={styles.photo} />
        <span className={styles.photoText}>Edit Avatar</span>
      </div>
      <div className={styles.nameContainer}>
        <InputField
          className={styles.wide}
          defaultValue={memberData?.firstName}
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
          defaultValue={memberData?.lastName}
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
        defaultValue={memberData?.eMail}
        disabled={pending}
        error={state.errors.eMail}
        name="eMail"
        placeholder="eric.clapton@humanoids.nl"
        required
        title="E-mail address"
        type="email"
      />
      <InputField
        defaultValue={memberData?.position}
        disabled={pending}
        error={state.errors.position}
        name="position"
        placeholder="Front-end Developer"
        required
        title="Position"
        type="text"
      />
      <InputField
        defaultValue={memberData?.info}
        disabled={pending}
        error={state.errors.info}
        name="info"
        placeholder="Extra info"
        title="Info"
        type="text"
      />
      <InputField
        defaultValue={memberData?.client}
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
          {memberData ? "Edit member" : "Add member"}
        </Button>
      </div>
    </Form>
  );
};
