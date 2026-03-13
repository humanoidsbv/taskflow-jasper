import Image from "next/image";
import Link from "next/link";

import ChevronIcon from "@/public/icons/chevron-down.svg";
import HumanoidsLogo from "@/public/logos/humanoids_logo.svg";
import photo from "@/public/profile-photo.jpg";

import styles from "./UserProfile.module.css";

export const UserProfile = () => (
  <div className={styles.container}>
    <Link className={styles.profile} href="/">
      <HumanoidsLogo alt="Humanoids logo" className={styles.logo} />
      <Image
        alt="Profile picture of a Humanoid"
        className={styles.photo}
        src={photo}
      />
    </Link>
    <ChevronIcon alt="Toggle the profile" className={styles.chevron} />
  </div>
);
