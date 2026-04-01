import { FormattedMemberData, MemberData } from "@/types/dataTypes";
import { capitalizeString, monthFormat } from "@/utils/utils";

export const formatMemberData = ({
  startingDate,
  ...props
}: MemberData): FormattedMemberData => {
  const startingMonth = capitalizeString(
    monthFormat.format(new Date(startingDate)),
  );

  return {
    startingMonth,
    ...props,
  };
};
