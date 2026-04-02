"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
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
                variant="secondary"
                onClick={() => {
                  closeModal();
                  removeFilters();
                }}
                type="button"
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
