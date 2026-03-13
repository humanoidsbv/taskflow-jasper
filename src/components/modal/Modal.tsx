"use client";

import { ReactNode, RefObject } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  id?: string;
  modalRef: RefObject<HTMLDialogElement | null>;
}

export const Modal = ({ modalRef, id, children }: ModalProps) => {
  return (
    <dialog
      className={styles.dialog}
      onClick={(e) => e.target === modalRef.current && modalRef.current.close()}
      ref={modalRef}
      id={id}
    >
      <div className={styles.container}>{children}</div>
    </dialog>
  );
};
