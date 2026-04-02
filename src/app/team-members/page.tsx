import {
  getClientsFromMembers,
  getMembers,
  getPositions,
} from "@/services/members";
import { FiltersToolbar } from "@/components/filters/FiltersToolbar";
import { MemberCards } from "@/components/member-cards/MemberCards";
import { MembersFilters } from "@/components/filters";
import { Subheader } from "@/components/subheader/Subheader";

interface TeamMembersPageProps {
  searchParams: Promise<{
    client: string;
    position: string;
    searchMember: string;
    sortBy: string;
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
        filtersAmountActive={filtersAmountActive}
        pageName="Team members"
      >
        <MembersFilters clients={clients} positions={positions} />
      </FiltersToolbar>
      <MemberCards members={members} />
    </>
  );
}
