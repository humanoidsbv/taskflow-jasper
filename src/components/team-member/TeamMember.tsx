import { teamMembers } from "@/fixtures/teamMembers";

import styles from "./TeamMember.module.css";

interface TeamMemberProps {
  teamMember: (typeof teamMembers)[number];
}

export const TeamMember = ({ teamMember }: TeamMemberProps) => {
  const { name, title, startDate, client, otherInfo } = teamMember;

  return (
    <li className={styles.teamMember}>
      <h3>Name: {name}</h3>
      <h4>Title: {title}</h4>
      <p>Start Date: {startDate}</p>
      <p>Client: {client}</p>
      <p>Other Info: {otherInfo}</p>
    </li>
  );
};
