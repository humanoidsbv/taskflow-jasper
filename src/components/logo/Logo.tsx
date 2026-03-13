import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/public/logos/taskflow-logo.svg";

import styles from "./Logo.module.css";

interface LogoProps {
  onClick?: () => void;
}

export const Logo = ({ onClick }: LogoProps) => (
  <Link href="/" className={styles.link} onClick={onClick}>
    <LogoImage alt="Taskflow logo" className={styles.logo} />
  </Link>
);
