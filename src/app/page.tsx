import { CalendarFilters } from "@/components/filters/CalendarFilters";
import { Filters } from "@/components/filters/Filters";
import { getClients, getTimeEntries } from "@/services/timeEntries";
import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";

interface CalendarPageProps {
  searchParams: Promise<{
    client?: string;
    date?: string;
    search?: string;
    sort_by?: string;
  }>;
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const params = searchParams ?? {};
  const timeEntries = await getTimeEntries(params);
  const clients = await getClients();

  // if ((await searchParams)?.search)
  //   if ((await searchParams)?.client)
  //   if ((await searchParams)?.date)
  //   if ((await searchParams)?.sort_by)
  const filtersAmountActive = Object.values(await searchParams).length;

  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="calendar" />
      <Filters pageName="Calendar" filtersAmountActive={filtersAmountActive}>
        <CalendarFilters clients={clients} />
      </Filters>
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
