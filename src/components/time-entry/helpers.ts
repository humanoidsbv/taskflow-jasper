import { formatHours, getElapsedTime, timeFormat } from "@/utils/utils";
import { FormattedTimeEntryData, TimeEntryData } from "@/types/dataTypes";

export const formatTimeEntryData = ({
  startTimestamp,
  stopTimestamp,
  ...props
}: TimeEntryData): FormattedTimeEntryData => {
  const elapsedHours = getElapsedTime(
    new Date(startTimestamp),
    new Date(stopTimestamp),
  );
  const totalTime = formatHours(elapsedHours);

  const timeInterval = `${timeFormat.format(new Date(startTimestamp))} - ${timeFormat.format(new Date(stopTimestamp))}`;

  return {
    timeInterval,
    totalTime,
    ...props,
  };
};
