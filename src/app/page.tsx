import { CalendarFilters } from "@/components/filters/CalendarFilters";
import { Filters } from "@/components/filters/Filters";
import { getTimeEntries } from "@/services/timeEntries";
import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";

export default async function CalendarPage() {
  const timeEntries = await getTimeEntries();

  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="calendar" />
      <Filters pageName="Calendar">
        <CalendarFilters />
      </Filters>
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
