import Image from "next/image";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

export default function CalendarPage() {
  const { buttonText, title, buttonAltText } = translations.calendar;

  return (
    <Subheader subtitle="12 events" title={title}>
      <Button href={{ query: { calendarModal: true } }}>
        <Image alt={buttonAltText} src={buttonIcon} />
        <span>{buttonText}</span>
      </Button>
    </Subheader>
  );
}
