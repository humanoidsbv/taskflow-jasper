import { MembersFilters } from "@/components/filters";
import { FiltersToolbar } from "@/components/filters/FiltersToolbar";
import { MemberCards } from "@/components/member-cards/MemberCards";
import { Subheader } from "@/components/subheader/Subheader";
import {
  getClientsFromMembers,
  getMembers,
  getPositions,
} from "@/services/members";

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
  const clients = await getClientsFromMembers();
  const positions = await getPositions();
  const filtersAmountActive = Object.values(await searchParams).length;

  const subtitle = `${members.length} member${members.length === 1 ? "" : "s"}`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="teamMembers" />
      <FiltersToolbar
        pageName="Team members"
        filtersAmountActive={filtersAmountActive}
      >
        <MembersFilters clients={clients} positions={positions} />
      </FiltersToolbar>
      <MemberCards members={members} />
    </>
  );
}
