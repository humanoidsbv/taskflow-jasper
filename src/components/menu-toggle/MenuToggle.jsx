"use client";

import Image from "next/image";

import closeIcon from "@/public/icons/close.svg";
import hamburgerIcon from "@/public/icons/hamburger-icon.svg";

import styles from "./MenuToggle.module.css";

export const MenuToggle = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button className={styles.button} onClick={() => toggleMenu(!isMenuOpen)}>
      <Image
        alt="Toggle the navigation menu"
        className={styles.image}
        src={isMenuOpen ? closeIcon : hamburgerIcon}
      />
    </button>
  );
};
