import Image from "next/image";

import { Button } from "@/components/button/Button";
import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";
import { timeEntries } from "@/fixtures/timeEntries";
import { translations } from "@/services/translations";
import buttonIcon from "@/public/icons/plus-icon.svg";

export default function CalendarPage() {
  const { buttonText, title, buttonAltText } = translations.calendar;
  const nTimeEntries = timeEntries.length;
  const subtitle =
    nTimeEntries === 1 ? `${nTimeEntries} event` : `${nTimeEntries} events`;

  return (
    <>
      <Subheader subtitle={subtitle} title={title}>
        <Button href={{ query: { calendarModal: true } }}>
          <Image alt={buttonAltText} src={buttonIcon} />
          <span>{buttonText}</span>
        </Button>
      </Subheader>
      <TimeEntries timeEntriesData={timeEntries} />
    </>
  );
}
