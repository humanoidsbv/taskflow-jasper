import { teamMembers } from "@/services/fixtures";

import styles from "./TeamMember.module.css";

interface TeamMemberProps {
  teamMember: {
    name: string;
    title: string;
    startDate: string;
    client: string;
    otherInfo: string;
  };
}

export const TeamMember = ({ teamMember }: TeamMemberProps) => {
  return (
    <li className={styles.teamMember}>
      <h3>Name: {teamMember.name}</h3>
      <h4>Title: {teamMember.title}</h4>
      <p>Start Date: {teamMember.startDate}</p>
      <p>Client: {teamMember.client}</p>
      <p>Other Info: {teamMember.otherInfo}</p>
    </li>
  );
};
