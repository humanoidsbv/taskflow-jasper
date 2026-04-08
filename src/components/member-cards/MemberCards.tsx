"use client";

import { Fragment, useRef, useState } from "react";

import { CreatedMember } from "@/types/dataTypes";
import { MemberCard } from "../member-card/MemberCard";
import { MemberForm } from "../forms";
import { Modal } from "../modal/Modal";
import CloseIcon from "@/public/icons/close.svg";

import styles from "./MemberCards.module.css";

interface MemberCardsProps {
  members: CreatedMember[];
}

export const MemberCards = ({ members }: MemberCardsProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentEntry, setCurrentEntry] = useState({} as CreatedMember);

  const editMember = (data: CreatedMember) => {
    setCurrentEntry(data);
    modalRef.current?.showModal();
  };

  return (
    <>
      <Modal modalRef={modalRef}>
        <button
          onClick={() => modalRef.current?.close()}
          className={styles.close}
        >
          <CloseIcon alt="Close the modal" />
        </button>
        <MemberForm modalRef={modalRef} memberData={currentEntry} />
      </Modal>
      <ul className={styles.list}>
        {members.map((entry) => {
          return <MemberCard key={entry.id} data={entry} onEdit={editMember} />;
        })}
      </ul>
    </>
  );
};
