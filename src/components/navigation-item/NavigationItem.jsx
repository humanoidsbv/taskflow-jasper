import Link from "next/link";
import styles from "./NavigationItem.module.css";

export const NavigationItem = ({ children, link }) => {
  return (
    <li>
      <Link href={link ? link : "/"} className={styles.link}>
        {children}
      </Link>
    </li>
  );
};
