"use client";

import { useState } from "react";

import { Logo } from "@/components/logo/Logo";
import { MenuToggle } from "@/components/menu-toggle/MenuToggle";
import { Navigation } from "@/components/navigation/Navigation";
import { UserProfile } from "@/components/userprofile/UserProfile";

import styles from "./Header.module.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`${styles.header} ${isMenuOpen ? styles.headerFull : ""}`}>
      <div className={styles.logoContainer}>
        <Logo onClick={() => setIsMenuOpen(false)} />
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
      <Navigation onClick={() => setIsMenuOpen(false)} />
      <UserProfile />
    </div>
  );
};
