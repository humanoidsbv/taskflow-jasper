"use client";

import { createMemberEvent } from "@/services/actions";
import { RefObject, useActionState } from "react";
import { Button } from "../button/Button";
import Form from "next/form";

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
    <Form action={formAction}>
      <Button type="submit">Hello</Button>
    </Form>
  );
};
