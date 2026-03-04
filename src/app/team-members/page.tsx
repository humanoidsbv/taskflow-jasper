import { Subheader } from "@/components/subheader/Subheader";

export default function TeamMembersPage() {
  return (
    <Subheader
      queryKey="membersModal"
      subtitle="12 members"
      translationKey="teamMembers"
    />
  );
}
