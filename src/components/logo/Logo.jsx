import Image from "next/image";
import styles from "./Logo.module.css";
import logo from "../../../public/logos/taskflow-logo.svg";
import Link from "next/link";

export const Logo = ({ onClick }) => {
  return (
    // <Image src="https://example.com/profile.png" />
    <Link href="/" className={styles.link} onClick={() => onClick(false)}>
      <Image className={styles.logo} src={logo} alt="Taskflow logo" />
    </Link>
  );
};
