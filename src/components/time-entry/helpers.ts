import { FormattedTimeEntryData, TimeEntryData } from "@/types/dataTypes";
import { formatElapsedTime, timeFormat } from "@/utils/utils";

export const formatTimeEntryData = ({
  startTimestamp,
  stopTimestamp,
  ...props
}: TimeEntryData): FormattedTimeEntryData => {
  const totalTime = formatElapsedTime(
    new Date(startTimestamp),
    new Date(stopTimestamp),
  );
  const timeInterval = `${timeFormat.format(new Date(startTimestamp))} - ${timeFormat.format(new Date(stopTimestamp))}`;

  return {
    timeInterval,
    totalTime,
    ...props,
  };
};
