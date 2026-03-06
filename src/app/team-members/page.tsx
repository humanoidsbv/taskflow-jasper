import Image from "next/image";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { TeamMembers } from "@/components/team-members/TeamMembers";
import { teamMembers } from "@/services/teamMembers";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

export default function TeamMembersPage() {
  const { buttonText, title, buttonAltText } = translations.teamMembers;
  const nTeamMembers = teamMembers.length;
  const subtitle =
    nTeamMembers === 1 ? `${nTeamMembers} member` : `${nTeamMembers} members`;

  return (
    <>
      <Subheader subtitle={subtitle} title={title}>
        <Button href={{ query: { membersModal: true } }}>
          <Image alt={buttonAltText} src={buttonIcon} />
          <span>{buttonText}</span>
        </Button>
      </Subheader>
      <TeamMembers teamMembers={teamMembers} />
    </>
  );
}
