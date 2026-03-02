import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logos/taskflow-logo.svg";

import styles from "./Logo.module.css";

interface LogoProps {
  onClick?: () => void;
}

export const Logo = ({ onClick }: LogoProps) => (
  <Link href="/" className={styles.link} onClick={onClick}>
    <Image alt="Taskflow logo" className={styles.logo} src={logo} />
  </Link>
);
