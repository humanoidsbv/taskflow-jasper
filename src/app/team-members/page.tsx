import { Filters } from "@/components/filters/Filters";
import { Subheader } from "@/components/subheader/Subheader";
import { teamMembers } from "@/services/fixtures";

export default function TeamMembersPage() {
  const subtitle = `${teamMembers.length} member${
    teamMembers.length === 1 ? "" : "s"
  }`;

  return (
    <>
      <Subheader subtitle={subtitle} pageName="teamMembers" />
      <Filters pageName="Team members">
        <></>
      </Filters>
    </>
  );
}
