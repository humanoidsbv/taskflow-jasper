import Image from "next/image";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { teamMembers } from "@/services/fixtures";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

export default function TeamMembersPage() {
  const { buttonText, title, buttonAltText } = translations.teamMembers;
  const subtitle =
    teamMembers.length === 1
      ? `${teamMembers.length} member`
      : `${teamMembers.length} members`;

  return (
    <Subheader subtitle={subtitle} title={title}>
      <Button href={{ query: { membersModal: true } }}>
        <Image alt={buttonAltText} src={buttonIcon} />
        <span>{buttonText}</span>
      </Button>
    </Subheader>
  );
}
