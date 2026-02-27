import Image from "next/image";
import styles from "./Logo.module.css";
import logo from "@/public/logos/taskflow-logo.svg";
import Link from "next/link";

export const Logo = ({ onClick }) => {
  return (
    <Link href="/" className={styles.link} onClick={onClick}>
      <Image alt="Taskflow logo" className={styles.logo} src={logo} />
    </Link>
  );
};
