import Link from "next/link";
import styles from "./NavigationItem.module.css";

export const NavigationItem = ({
  children,
  link,
  setMenuIsOpen,
  isCurrentPage,
}) => {
  return (
    <li
      className={`${styles.item} ${isCurrentPage ? styles["item-active"] : ""}`}
    >
      <Link
        onClick={() => setMenuIsOpen(false)}
        href={link ? link : "/"}
        className={styles.link}
      >
        {children}
      </Link>
    </li>
  );
};
