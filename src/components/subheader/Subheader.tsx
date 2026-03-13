"use client";

import { useRef } from "react";

import { Button } from "../button/Button";
import { Modal } from "@/components/modal/Modal";
import { translations } from "@/services/translations";
import CloseIcon from "@/public/icons/close.svg";
import PlusIcon from "@/public/icons/plus-icon.svg";

import styles from "./Subheader.module.css";
import { TimeEntryForm } from "../time-entry-form/TimeEntryForm";

interface SubheaderProps {
  pageName: keyof typeof translations;
  subtitle: string;
}

export const Subheader = ({ pageName, subtitle }: SubheaderProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { buttonText, buttonAltText, title } =
    translations[pageName in translations ? pageName : "default"];

  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{title}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <Button onClick={() => modalRef.current?.showModal()}>
        <PlusIcon alt={buttonAltText} />
        <span>{buttonText}</span>
      </Button>
      <Modal modalRef={modalRef}>
        <button
          onClick={() => modalRef.current?.close()}
          className={styles.close}
        >
          <CloseIcon alt="Close the modal" className={styles.icon} />
        </button>
        {pageName === "calendar" ? (
          <TimeEntryForm closeModal={() => modalRef.current?.close()} />
        ) : (
          <>{pageName} form here</>
        )}
      </Modal>
    </div>
  );
};
