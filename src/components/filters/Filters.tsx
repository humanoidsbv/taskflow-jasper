"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import FilterIcon from "@/public/icons/filter.svg";
// import FilterIcon from "@/public/icons/close.svg";
// import CloseIcon from "@/public/icons/close.svg";

interface FiltersProps {
  children: React.ReactNode;
}

export const Filters = ({ children }: FiltersProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const buttonText = "Filters (0 applied)";
  const buttonAltText = "Apply filters";

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
            <button onClick={() => modalRef.current?.close()}>
              {/* <CloseButton alt="Close the modal" /> */}
            </button>
            {children}
          </Modal>
        </>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};
