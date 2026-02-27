"use client";

import Image from "next/image";
import { Button } from "../button/Button";
import styles from "./Subheader.module.css";
import buttonIcon from "@/public/icons/plus-icon.svg";
import { usePathname } from "next/navigation";
import destinations from "@/services/destinations.json" with { type: "json" };

export const Subheader = () => {
  const pathname = usePathname();
  if (pathname === "/") return;
  const destination = destinations.filter(
    (entry) => entry.href === pathname,
  )[0];
  const variant = destination.variant;

  let buttonText = "";

  switch (variant) {
    case "event":
      buttonText = "Add new events";
      break;
    case "member":
      buttonText = "Add members";
      break;
    default:
      buttonText = "Default";
      break;
  }

  console.log(pathname);
  console.log(destinations);
  console.log(destination);

  // console.log(destination[0]);

  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5 className={styles.title}>{destination.name}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>{destination.subtitle}</p>
      </div>
      <Button>
        <Image
          src={buttonIcon}
          alt={`${destination.variant === "member" ? "Add member" : "Add new events"} `}
        />
        <span className={styles.text}>{buttonText}</span>
      </Button>
    </div>
  );
};
