import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logos/taskflow-logo.svg";

import styles from "./Logo.module.css";

export const Logo = ({ onClick }) => {
  return (
    <Link href="/" className={styles.link} onClick={() => onClick(false)}>
      <Image alt="Taskflow logo" className={styles.logo} src={logo} />
    </Link>
  );
};
