import { CreatedMember } from "@/types/dataTypes";

import { InfoField } from "../info-field/InfoField";
import { formatMemberData } from "./helpers";
import { Button } from "../button/Button";
import EditIcon from "@/public/icons/edit.svg";
import photo from "@/public/images/Eric.jpeg";

import styles from "./MemberCard.module.css";
import Image from "next/image";

interface MemberCardProps {
  data: CreatedMember;
}

export const MemberCard = ({ data }: MemberCardProps) => {
  const { client, fullName, info, position, startingMonth } =
    formatMemberData(data);

  return (
    <li className={styles.container}>
      <div className={styles.info}>
        <Image
          alt="Profile picture of a Humanoid"
          className={styles.photo}
          src={photo}
        />
        <span className={styles.name}>{`${fullName}`}</span>
        <span className={styles.position}>{position}</span>
      </div>
      <div className={styles.details}>
        <InfoField title="Starting date" value={startingMonth} />
        <InfoField title="Client" value={client} />
        <InfoField className={styles.two} title="Other data" value={info} />
      </div>
      <div className={styles.divider}></div>
      <Button variant="secondary">
        <EditIcon />
        Edit member
      </Button>
    </li>
  );
};
