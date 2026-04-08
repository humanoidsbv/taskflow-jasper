import { filterOptions, membersSortByOptions } from "@/services/queries";

export const getElapsedTime = (startDate: Date, stopDate: Date): number => {
  const totalMinutes = Math.max(
    0,
    Math.floor((stopDate.getTime() - startDate.getTime()) / (1000 * 60)),
  );
  const elapsedHours = totalMinutes / 60;

  return elapsedHours;
};

export const formatHours = (hours: number): string => {
  const totalMinutes = hours * 60;
  const roundedHours = Math.floor(totalMinutes / 60);
  const restMinutes = totalMinutes % 60;
  return `${roundedHours.toFixed(0).toString().padStart(2, "0")}:${restMinutes.toFixed(0).toString().padStart(2, "0")}`;
};

export const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const dateFormat = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "numeric",
  timeZone: "UTC",
  weekday: "long",
});

export const timeFormat = new Intl.DateTimeFormat("nl-NL", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

export const capitalizeString = (text: string) =>
  `${text.at(0)?.toUpperCase()}${text.slice(1)}`;

const deCapitalizeString = (text: string) =>
  `${text.at(0)?.toLowerCase()}${text.slice(1)}`;

const preNames = [
  "van",
  "aan",
  "de",
  "der",
  "den",
  "in",
  "ten",
  "uit",
  "te",
  "ter",
];

export const formatFullName = (firstName: string, lastName: string): string => {
  if (preNames.includes(lastName.split(" ")[0].toLowerCase()))
    return `${firstName} ${deCapitalizeString(lastName)}`;
  else return `${firstName} ${lastName}`;
};

export const buildQueryParams = (inputParams?: {
  [key: string]: string;
}): string => {
  const params = new URLSearchParams();

  for (const [param, value] of Object.entries(inputParams ?? {})) {
    if (param === "sortBy") {
      const query = membersSortByOptions.find(
        (option) => option.value === value,
      )?.query;
      query && params.set("_sort", query);
    } else {
      const query = filterOptions.find((query) => query.value === param)?.query;
      query && params.append(query, value);
    }
  }

  params.append("_sort", "startingDate");

  return params.toString();
};
