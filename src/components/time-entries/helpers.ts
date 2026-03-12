import { TimeEntryData } from "@/types/dataTypes";
import { capitalizeString, dateFormat } from "@/utils/utils";

export const formatHeader = ({ startTimestamp }: TimeEntryData): string => {
  const msPerDay = 24 * 3600 * 1000;
  const entryDate = new Date(startTimestamp);
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate.getTime() - msPerDay);
  const formattedEntryDate = capitalizeString(dateFormat.format(entryDate));
  const isToday = entryDate.toDateString() === currentDate.toDateString();
  const isYesterday = entryDate.toDateString() === yesterdayDate.toDateString();

  return `${formattedEntryDate}${isToday ? " (Today)" : ""}${isYesterday ? " (Yesterday)" : ""}`;
};
