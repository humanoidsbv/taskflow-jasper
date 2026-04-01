import { Filters } from "@/components/filters/Filters";
import { Subheader } from "@/components/subheader/Subheader";
import { getMembers } from "@/services/members";

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
  const subtitle = `${members.length} member${members.length === 1 ? "" : "s"}`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="teamMembers" />
      <Filters pageName="Team members" filtersAmountActive={0}>
        <></>
      </Filters>
    </>
  );
}
