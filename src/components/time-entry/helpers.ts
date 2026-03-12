import { formatElapsedTime, timeFormat } from "@/utils/utils";
import { FormattedTimeEntryData, TimeEntryData } from "@/types/dataTypes";

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
