import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";
import { timeEntries } from "@/services/fixtures";

export default function CalendarPage() {
  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="calendar" />
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
