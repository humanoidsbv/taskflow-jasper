import Link from "next/link";

import styles from "./NavigationItem.module.css";

export const NavigationItem = ({
  children,
  isCurrentPage,
  link,
  setMenuIsOpen,
}) => {
  return (
    <li
      className={`${styles.item} ${isCurrentPage ? styles["item-active"] : ""}`}
    >
      <Link
        className={styles.link}
        href={link ? link : "/"}
        onClick={() => setMenuIsOpen(false)}
      >
        {children}
      </Link>
    </li>
  );
};
