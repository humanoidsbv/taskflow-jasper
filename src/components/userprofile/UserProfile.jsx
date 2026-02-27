import Image from "next/image";
import Link from "next/link";

import chevron from "@/public/icons/chevron-down.svg";
import logo from "@/public/logos/humanoids-logo.png";
import photo from "@/public/profile-photo.jpg";

import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.profile} href="/">
        <Image alt="Humanoids logo" className={styles.logo} src={logo} />
        <Image
          alt="Profile picture of a Humanoid"
          className={styles.photo}
          src={photo}
        />
      </Link>
      <Image
        alt="Toggle the profile"
        className={styles.chevron}
        src={chevron}
      />
    </div>
  );
};
