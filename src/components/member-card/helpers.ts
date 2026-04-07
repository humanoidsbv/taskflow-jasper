import { capitalizeString, monthFormat } from "@/utils/utils";
import { CreatedMember, FormattedMemberData } from "@/types/dataTypes";

export const formatMemberData = ({
  startingDate,
  ...props
}: CreatedMember): FormattedMemberData => {
  const startingMonth = capitalizeString(
    monthFormat.format(new Date(startingDate)),
  );

  return {
    startingMonth,
    ...props,
  };
};
