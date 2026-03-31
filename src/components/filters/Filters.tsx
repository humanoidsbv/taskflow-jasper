"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import FilterIcon from "@/public/icons/filter.svg";
import CloseIcon from "@/public/icons/close.svg";
import TaskflowLogo from "@/public/logos/taskflow-logo.svg";

import styles from "./Filters.module.css";

interface FiltersProps {
  pageName: string;
  children: React.ReactNode;
  filtersAmountActive: number;
}

export const Filters = ({
  pageName,
  children,
  filtersAmountActive,
}: FiltersProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const buttonText = `Filters (${filtersAmountActive} applied)`;
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
                <Button type="submit" disabled={false}>
                  Apply
                </Button>
                <Button
                  className={styles.cancelButton}
                  variant="secondary"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
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
