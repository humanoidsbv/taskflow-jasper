import Image from "next/image";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

export default function CalendarPage() {
  const { buttonText } = translations["calendar"];
  const buttonHref = {
    query: { calendarModal: true },
  };
  const subtitle = "12 events";
  const title = "Calendar";
  return (
    <Subheader subtitle={subtitle} title={title}>
      <Button href={buttonHref}>
        <Image alt="Plus icon" src={buttonIcon} />
        <span>{buttonText}</span>
      </Button>
    </Subheader>
  );
}
