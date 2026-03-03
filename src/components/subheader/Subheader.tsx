import Image from "next/image";

import { Button } from "../button/Button";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

import styles from "./Subheader.module.css";

interface SubheaderProps {
  itemCount: number;
  queryKey: string;
  slug: keyof typeof translations;
}

export const Subheader = ({ itemCount, queryKey, slug }: SubheaderProps) => {
  const { buttonText, title } = slug
    ? translations[slug]
    : translations.default;
  const buttonHref = {
    query: { [queryKey]: true },
  };

  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{title}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>{itemCount} items</p>
      </div>
      <Button href={buttonHref}>
        <Image alt="Plus icon" src={buttonIcon} />
        <span className={styles.text}>{buttonText}</span>
      </Button>
    </div>
  );
};
