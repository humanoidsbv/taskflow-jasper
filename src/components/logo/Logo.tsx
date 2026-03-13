import Link from "next/link";

import TaskflowLogo from "@/public/logos/taskflow-logo.svg";

import styles from "./Logo.module.css";

interface LogoProps {
  onClick?: () => void;
}

export const Logo = ({ onClick }: LogoProps) => (
  <Link href="/" className={styles.link} onClick={onClick}>
    <TaskflowLogo alt="Taskflow logo" className={styles.logo} />
  </Link>
);
