import { Filters } from "@/components/filters/Filters";
import { MemberCards } from "@/components/member-cards/MemberCards";
import { Subheader } from "@/components/subheader/Subheader";
import { getMembers } from "@/services/members";
import { getClients } from "@/services/timeEntries";

interface TeamMembersPageProps {
  searchParams: Promise<{
    sort_by?: string;
    client?: string;
    position: string;
    search: string;
    startingDate: string;
  }>;
}

export default async function TeamMembersPage({
  searchParams,
}: TeamMembersPageProps) {
  const members = await getMembers(searchParams);
  const clients = await getClients();
  const filtersAmountActive = Object.values(await searchParams).length;

  const subtitle = `${members.length} member${members.length === 1 ? "" : "s"}`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="teamMembers" />
      <Filters
        pageName="Team members"
        filtersAmountActive={filtersAmountActive}
      >
        <></>
      </Filters>
      <MemberCards members={members} />
    </>
  );
}
