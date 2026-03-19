import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";
import { getTimeEntries } from "@/services/timeEntries";

export default async function CalendarPage() {
  const timeEntries = await getTimeEntries();

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
