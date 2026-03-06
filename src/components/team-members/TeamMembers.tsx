import { teamMembers } from "@/services/teamMembers";

import { Filters } from "../filters/Filters";
import { TeamMember } from "../team-member/TeamMember";

import styles from "./TeamMembers.module.css";

interface TeamMembersProps {
  teamMembers: typeof teamMembers;
}

export const TeamMembers = ({ teamMembers }: TeamMembersProps) => {
  const filters = [
    {
      filterTitle: "All",
      filterValue: "all",
      filterPlaceholder: "All",
    },
  ];

  return (
    <div className={styles.container}>
      <Filters filters={filters} />
      <ul>
        {teamMembers.map((teamMember) => (
          <TeamMember teamMember={teamMember} key={teamMember.id} />
        ))}
      </ul>
    </div>
  );
};
