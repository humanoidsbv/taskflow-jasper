import { CalendarFilters } from "@/components/filters/CalendarFilters";
import { Filters } from "@/components/filters/Filters";
import { getClients, getTimeEntries } from "@/services/timeEntries";
import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";

interface CalendarPageProps {
  searchParams: Promise<{
    sort_by?: string;
    client?: string;
    date?: string;
    search?: string;
  }>;
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const params = searchParams ?? {};
  const timeEntries = await getTimeEntries(params);
  const clients = await getClients();
  const filtersNumberApplied = params;
  console.log("filtersNumberApplied: ", filtersNumberApplied);

  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="calendar" />
      <Filters pageName="Calendar">
        <CalendarFilters clients={clients} />
      </Filters>
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
