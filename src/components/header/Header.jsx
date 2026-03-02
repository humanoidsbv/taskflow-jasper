"use client";

import { useState } from "react";

import { Logo } from "../logo/Logo";
import { MenuToggle } from "../menu-toggle/MenuToggle";
import { Navigation } from "../navigation/Navigation";
import { UserProfile } from "../userprofile/UserProfile";

import styles from "./Header.module.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={`${styles.header} ${isMenuOpen ? styles["header-full"] : ""}`}
    >
      <div className={styles["logo-container"]}>
        <Logo onClick={() => setIsMenuOpen(false)} />
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
      <Navigation onClick={() => setIsMenuOpen(false)} />
      <UserProfile />
    </div>
  );
};
