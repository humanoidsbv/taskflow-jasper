import Link from "next/link";

import styles from "./NavigationItem.module.css";

export const NavigationItem = ({
  children,
  isCurrentPage,
  link,
  onClick,
}) => {
  return (
    <li
      className={`${styles.item} ${isCurrentPage ? styles["item-active"] : ""}`}
    >
      <Link
        className={styles.link}
        href={link ? link : "/"}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};
