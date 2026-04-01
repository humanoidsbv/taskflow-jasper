import { FiltersToolbar } from "@/components/filters/FiltersToolbar";
import { Subheader } from "@/components/subheader/Subheader";
import { teamMembers } from "@/services/fixtures";

export default function TeamMembersPage() {
  const subtitle = `${teamMembers.length} member${
    teamMembers.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="teamMembers" />
      <FiltersToolbar pageName="Team members">
        <></>
      </FiltersToolbar>
    </>
  );
}
