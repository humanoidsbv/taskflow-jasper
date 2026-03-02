"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "../button/Button";
import buttonIcon from "@/public/icons/plus-icon.svg";
import { routes } from "@/services/destinations";
import { translations } from "@/services/translations";

import styles from "./Subheader.module.css";

export const Subheader = () => {
  const pathname = usePathname();
  const currentDestination = routes.find((entry) => entry.href === pathname) || routes[0];
  if (!currentDestination) return null;

  const { variant } = currentDestination;
  const currentTranslation = translations[variant as keyof typeof translations] as { buttonText: string; buttonAltText: string };
  const { buttonText, buttonAltText } = currentTranslation;

  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{currentDestination.name}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>
          destination subtitle
        </p>
      </div>
      <Button>
        <Image alt={buttonAltText} src={buttonIcon} />
        <span className={styles.text}>{buttonText}</span>
      </Button>
    </div>
  );
};
