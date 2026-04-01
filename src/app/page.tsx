import { CalendarFilters, FiltersToolbar } from "@/components/filters";
import {
  getClientsFromTimeEntries,
  getTimeEntries,
} from "@/services/timeEntries";
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
  const timeEntries = await getTimeEntries(searchParams);
  const clients = await getClientsFromTimeEntries();
  const filtersAmountActive = Object.values(await searchParams).length;

  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="calendar" />
      <FiltersToolbar
        pageName="Calendar"
        filtersAmountActive={filtersAmountActive}
      >
        <CalendarFilters clients={clients} />
      </FiltersToolbar>
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
