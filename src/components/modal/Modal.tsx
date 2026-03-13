"use client";

import { ReactNode, RefObject } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  modalRef: RefObject<HTMLDialogElement | null>;
  onToggle: () => void;
  id?: string;
}

export const Modal = ({ modalRef, onToggle, children, id }: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const target = event.target as HTMLDialogElement;
    if (target.nodeName === "DIALOG") {
      onToggle();
    }
  };

  return (
    <dialog
      className={styles.dialog}
      onClick={handleBackdropClick}
      ref={modalRef}
      id={id}
    >
      <div className={styles.container}>{children}</div>
    </dialog>
  );
};
