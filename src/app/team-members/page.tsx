import Image from "next/image";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

export default function TeamMembersPage() {
  const { buttonText, title, buttonAltText } = translations["teamMembers"];

  return (
    <Subheader subtitle="12 members" title={title}>
      <Button href={{ query: { membersModal: true } }}>
        <Image alt={buttonAltText} src={buttonIcon} />
        <span>{buttonText}</span>
      </Button>
    </Subheader>
  );
}
