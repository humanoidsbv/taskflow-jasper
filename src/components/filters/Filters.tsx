"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import FilterIcon from "@/public/icons/filter.svg";
import CloseIcon from "@/public/icons/close.svg";
import TaskflowLogo from "@/public/logos/taskflow-logo.svg";

import styles from "./Filters.module.css";
import Link from "next/link";

interface FiltersProps {
  pageName: string;
  children: React.ReactNode;
}

export const Filters = ({ pageName, children }: FiltersProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const buttonText = "Filters (0 applied)";
  const buttonAltText = "Apply filters";
  const closeModal = () => modalRef.current?.close();

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 1160);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <Button
            onClick={() => modalRef.current?.showModal()}
            variant="tertiary"
          >
            <FilterIcon alt={buttonAltText} />
            <span>{buttonText}</span>
          </Button>
          <Modal modalRef={modalRef}>
            <div className={styles.container}>
              <button onClick={closeModal} className={styles.logo}>
                <TaskflowLogo />
              </button>
              <button className={styles.close} onClick={closeModal}>
                <CloseIcon alt="Close the modal" />
              </button>
              <h3 className={styles.pageTitle}>{pageName}</h3>
              <h3 className={styles.filters}>Filters</h3>
              {children}
              <div className={styles.buttons}>
                <Button
                  className={styles.cancelButton}
                  variant="secondary"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={false}>
                  Add event
                </Button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
