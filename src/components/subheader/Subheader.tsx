"use client";

import { useRef } from "react";

import { Button } from "../button/Button";
import { Modal } from "@/components/modal/Modal";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";
import Image from "next/image";

import styles from "./Subheader.module.css";

interface SubheaderProps {
  subtitle: string;
  pageName: keyof typeof translations;
}

export const Subheader = ({ subtitle, pageName }: SubheaderProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { buttonText, buttonAltText, title } = translations[pageName];

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
        <Image alt={buttonAltText} src={buttonIcon} />
        <span>{buttonText}</span>
      </Button>
      <Modal modalRef={modalRef} onToggle={toggleModal}>
        content
      </Modal>
    </div>
  );
};
