"use client";

import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";
import { timeEntries } from "@/services/fixtures";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";
import { Modal } from "@/components/modal/Modal";

export default function CalendarPage() {
  const modalRef = useRef<HTMLDialogElement>(null);

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

  const { buttonText, title, buttonAltText } = translations.calendar;
  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  const searchParams = {
    calendarModal: true,
  };

  return (
    <>
      <Subheader subtitle={subtitle} title={title}>
        <Button onClick={toggleModal}>
          <Image alt={buttonAltText} src={buttonIcon} />
          <span>{buttonText}</span>
        </Button>
        <Modal modalRef={modalRef} onToggle={toggleModal}>
          Bovenmodaal <br /> Modaal <br /> Ondermodaal
        </Modal>
      </Subheader>
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
