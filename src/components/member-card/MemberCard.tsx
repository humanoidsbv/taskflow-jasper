import Image from "next/image";

import { Button } from "@/components/button/Button";
import { CreatedMember } from "@/types/dataTypes";
import { formatMemberData } from "./helpers";
import { InfoField } from "@/components/info-field/InfoField";
import EditIcon from "@/public/icons/edit.svg";
import photo from "@/public/images/Eric.jpeg";

import styles from "./MemberCard.module.css";

interface MemberCardProps {
  data: CreatedMember;
  onEdit: (data: CreatedMember) => void;
}

export const MemberCard = ({ data, onEdit }: MemberCardProps) => {
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
        <span className={styles.name}>{fullName}</span>
        <span className={styles.position}>{position}</span>
      </div>
      <div className={styles.details}>
        <InfoField title="Starting date" value={startingMonth} />
        <InfoField title="Client" value={client} />
        <InfoField className={styles.two} title="Other data" value={info} />
      </div>
      <div className={styles.divider}></div>
      <Button variant="secondary" onClick={() => onEdit(data)}>
        <EditIcon />
        Edit member
      </Button>
    </li>
  );
};
