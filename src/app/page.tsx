import { Subheader } from "@/components/subheader/Subheader";

export default async function CalendarPage() {
  return (
    <Subheader
      queryKey="calendarModal"
      subtitle="12 events"
      translationKey="calendar"
    />
  );
}
