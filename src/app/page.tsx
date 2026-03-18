"use client";

import { useEffect, useState } from "react";

import { Subheader } from "@/components/subheader/Subheader";
import { TimeEntries } from "@/components/time-entries/TimeEntries";
import { getTimeEntries } from "@/services/actions";
import { TimeEntryData } from "@/types/dataTypes";

export default function CalendarPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntryData[]>([]);

  async function fetchTimeEntries() {
    setTimeEntries(await getTimeEntries());
  }

  const subtitle = `${timeEntries.length} event${
    timeEntries.length === 1 ? "" : "s"
  }`;

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  return (
    <>
      <Subheader subtitle={subtitle} pageName="calendar" />
      <TimeEntries timeEntries={timeEntries} />
    </>
  );
}
