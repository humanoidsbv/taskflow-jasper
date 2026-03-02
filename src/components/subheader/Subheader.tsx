"use client";

import Image from "next/image";

import { Button } from "../button/Button";
import buttonIcon from "@/public/icons/plus-icon.svg";

import styles from "./Subheader.module.css";

interface SubheaderProps {
  itemCount: number;
  pageTitle: string;
}

export const Subheader = ({ itemCount, pageTitle }: SubheaderProps) => {
  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{pageTitle}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>{itemCount} items</p>
      </div>
      <Button hasIconPadding>
        <Image alt="Add a new event" src={buttonIcon} />
        Add new event
      </Button>
    </div>
  );
};
