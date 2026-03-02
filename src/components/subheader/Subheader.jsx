"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "../button/Button";
import buttonIcon from "@/public/icons/plus-icon.svg";
import destinations from "@/services/destinations.json" with { type: "json" };
import translations from "@/services/translations.json" with { type: "json" };

import styles from "./Subheader.module.css";

export const Subheader = () => {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const currentDestination = destinations.find(
    (entry) => entry.href === pathname,
  );
  const { variant } = currentDestination;
  const currentTranslation = translations[variant];
  const { buttonText } = currentTranslation;

  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{currentDestination.name}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>
          destination subtitle{currentDestination.subtitle}
        </p>
      </div>
      <Button>
        <Image
          src={buttonIcon}
          alt={`${currentDestination.variant === "member" ? "Add member" : "Add new events"} `}
        />
        <span className={styles.text}>{buttonText}</span>
      </Button>
    </div>
  );
};
