"use client";

import Image from "next/image";

import CloseIcon from "@/public/icons/close.svg";
import HamburgerIcon from "@/public/icons/hamburger-icon.svg";

import styles from "./MenuToggle.module.css";

interface MenuToggleProps {
  isMenuOpen: Boolean;
  toggleMenu: (isMenuOpen: boolean) => void;
}

export const MenuToggle = ({ isMenuOpen, toggleMenu }: MenuToggleProps) => (
  <button className={styles.button} onClick={() => toggleMenu(!isMenuOpen)}>
    {isMenuOpen ? (
      <CloseIcon
        alt="Close the navigation menu"
        className={styles.image}
        // src={isMenuOpen ? closeIcon : hamburgerIcon}
      />
    ) : (
      <HamburgerIcon alt="Open the navigation menu" className={styles.image} />
    )}
  </button>
);
