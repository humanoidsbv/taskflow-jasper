"use client";

import { useRef } from "react";

import { Button } from "../button/Button";
import { Modal } from "@/components/modal/Modal";
import { translations } from "@/services/translations";
import ButtonIcon from "@/public/icons/plus-icon.svg";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./Subheader.module.css";

interface SubheaderProps {
  subtitle: string;
  pageName: keyof typeof translations;
}

export const Subheader = ({ subtitle, pageName }: SubheaderProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { buttonText, buttonAltText, title } =
    translations[pageName in translations ? pageName : "default"];

  const toggleModal = () => {
    if (!modalRef.current) {
      return;
    }
    if (modalRef.current.hasAttribute("open")) {
      modalRef.current.close();
      return;
    }
    modalRef.current.showModal();
  };

  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{title}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <Button onClick={toggleModal}>
        <ButtonIcon alt={buttonAltText} />
        <span>{buttonText}</span>
      </Button>
      <Modal modalRef={modalRef} onToggle={toggleModal}>
        <Button variant="empty" onClick={toggleModal} className={styles.close}>
          <CloseIcon alt="Close the modal" className={styles.icon} />
        </Button>
        {pageName} form here
      </Modal>
    </div>
  );
};
