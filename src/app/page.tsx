import { CalendarFilters, FiltersToolbar } from "@/components/filters";
import {
  getClientsFromTimeEntries,
  getTimeEntries,
} from "@/services/timeEntries";
import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface CalendarPageProps {
  searchParams: Promise<{
    client?: string;
    date?: string;
    search?: string;
    sortBy?: string;
  }>;
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

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
