import { teamMembers } from "@/services/teamMembers";

import { TeamMember } from "../team-member/TeamMember";

import styles from "./TeamMembers.module.css";

interface TeamMembersProps {
  teamMembers: typeof teamMembers;
}

export const TeamMembers = ({ teamMembers }: TeamMembersProps) => {
  return (
    <div className={styles.container}>
      <ul>
        {teamMembers.map((teamMember) => (
          <TeamMember teamMember={teamMember} key={teamMember.id} />
        ))}
      </ul>
    </div>
  );
};
