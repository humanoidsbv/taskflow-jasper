"use client";

import styles from "./MenuToggle.module.css";
import hamburgerIcon from "@/public/icons/hamburger-icon.svg";
import closeIcon from "@/public/icons/close.svg";
import Image from "next/image";

export const MenuToggle = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button className={styles.button} onClick={() => toggleMenu(!isMenuOpen)}>
      <Image
        className={styles.image}
        src={isMenuOpen ? closeIcon : hamburgerIcon}
        alt="Toggle the navigation menu"
      />
    </button>
  );
};
