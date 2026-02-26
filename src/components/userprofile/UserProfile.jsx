import Link from "next/link";
import styles from "./UserProfile.module.css";
import chevron from "@/public/icons/chevron-down.svg";
import logo from "@/public/logos/humanoids-logo.png";
import photo from "@/public/profile-photo.jpg";
import Image from "next/image";

export const UserProfile = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.profile} href="/">
        <Image className={styles.logo} src={logo} alt="Humanoids logo"></Image>
        <Image
          className={styles.photo}
          src={photo}
          alt="Profile picture of a Humanoid"
        ></Image>
      </Link>
      <Image
        className={styles.chevron}
        src={chevron}
        alt="Toggle the profile"
      />
    </div>
  );
};
