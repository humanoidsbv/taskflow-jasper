import Link from "next/link";

import styles from "./NavigationItem.module.css";
import { ReactNode } from "react";

interface NavigationItemProps {
  children: ReactNode;
  isCurrentPage: boolean;
  link: string;
  onClick: () => void;
}

export const NavigationItem = ({
  children,
  isCurrentPage,
  link,
  onClick,
}: NavigationItemProps) => (
  <li
    className={`${styles.item} ${isCurrentPage ? styles["item-active"] : ""}`}
  >
    <Link className={styles.link} href={link ? link : "/"} onClick={onClick}>
      {children}
    </Link>
  </li>
);
