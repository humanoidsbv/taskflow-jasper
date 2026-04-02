"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

import { Button } from "@/components/button/Button";
import { Modal } from "@/components/modal/Modal";
import CloseIcon from "@/public/icons/close.svg";
import FilterIcon from "@/public/icons/filter.svg";
import TaskflowLogo from "@/public/logos/taskflow-logo.svg";

import styles from "./FiltersToolbar.module.css";

interface FiltersToolbarProps {
  pageName: string;
  children: React.ReactNode;
  filtersAmountActive: number;
}

export const FiltersToolbar = ({
  pageName,
  children,
  filtersAmountActive,
}: FiltersToolbarProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const pathName = usePathname();
  const router = useRouter();
  const buttonText = `Filters (${filtersAmountActive} applied)`;
  const buttonAltText = "Apply filters";
  const closeModal = () => modalRef.current?.close();
  const removeFilters = () => router.replace(pathName);

  return (
    <>
      <div className={styles.mobile}>
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
              <Button type="submit" disabled={false} onClick={closeModal}>
                Apply
              </Button>
              <Button
                className={styles.cancelButton}
                onClick={() => {
                  closeModal();
                  removeFilters();
                }}
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className={styles.desktop}>{children}</div>
    </>
  );
};
