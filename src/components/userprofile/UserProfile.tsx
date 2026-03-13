import Image from "next/image";
import Link from "next/link";

import Chevron from "@/public/icons/chevron-down.svg";
import Logo from "@/public/logos/humanoids_logo.svg";
import photo from "@/public/profile-photo.jpg";

import styles from "./UserProfile.module.css";

export const UserProfile = () => (
  <div className={styles.container}>
    <Link className={styles.profile} href="/">
      <Logo alt="Humanoids logo" className={styles.logo} />
      <Image
        alt="Profile picture of a Humanoid"
        className={styles.photo}
        src={photo}
      />
    </Link>
    <Chevron alt="Toggle the profile" className={styles.chevron} />
  </div>
);
