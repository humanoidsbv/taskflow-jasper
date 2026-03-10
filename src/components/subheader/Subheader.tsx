
import { ReactNode } from "react";
import styles from "./Subheader.module.css";

interface SubheaderProps {
  children?: ReactNode;
  subtitle: string;
  title: string;
}

export const Subheader = ({ children, subtitle, title }: SubheaderProps) => {
  return (
    <div className={styles.subheader}>
      <div className={styles.titles}>
        <h5>{title}</h5>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
