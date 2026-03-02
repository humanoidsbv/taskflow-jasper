import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logos/taskflow-logo.svg";

import styles from "./Logo.module.css";

export const Logo = ({ onClick }) => (
  <Link href="/" className={styles.link} onClick={onClick}>
    <Image alt="Taskflow logo" className={styles.logo} src={logo} />
  </Link>
);
