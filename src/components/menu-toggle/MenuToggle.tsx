"use client";

import Image from "next/image";

import CloseIcon from "@/public/icons/close.svg";
import hamburgerIcon from "@/public/icons/hamburger-icon.svg";

import styles from "./MenuToggle.module.css";

interface MenuToggleProps {
  isMenuOpen: Boolean;
  toggleMenu: (isMenuOpen: boolean) => void;
}

export const MenuToggle = ({ isMenuOpen, toggleMenu }: MenuToggleProps) => (
  <button className={styles.button} onClick={() => toggleMenu(!isMenuOpen)}>
    <CloseIcon
      alt="Toggle the navigation menu"
      className={styles.image}
      // src={isMenuOpen ? closeIcon : hamburgerIcon}
    />
  </button>
);
