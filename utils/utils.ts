import {
  membersSortByOptions,
  calendarSortByOptions,
} from "@/services/queries";

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

export const buildTimeEntriesQueryParams = (inputParams?: {
  [key: string]: string;
}): string => {
  const params = new URLSearchParams();

  for (const [param, value] of Object.entries(inputParams ?? {})) {
    if (!value) continue;
    if (param === "sortBy") {
      const sort = calendarSortByOptions.find(
        (option) => option.value === value,
      )?.postgRESTQuery;
      if (sort) {
        params.set("order", sort);
      }
      continue;
    }
    if (param === "client") {
      const values = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      if (values.length) params.append("client", `in.(${values.join(",")})`);
      continue;
    }
    if (param === "searchClient") {
      params.append("client", `ilike.*${value}*`);
      continue;
    }
    if (param === "startingDate") {
      params.append("startTimestamp", `gte.${value}`);
    }
  }
  if (!params.has("order")) params.set("order", "startTimestamp.desc");

  return params.toString();
};

export const buildMemberQueryParams = (inputParams?: {
  [key: string]: string;
}): string => {
  const params = new URLSearchParams();

  for (const [param, value] of Object.entries(inputParams ?? {})) {
    if (!value) continue;
    if (param === "sortBy") {
      const sort = membersSortByOptions.find(
        (option) => option.value === value,
      )?.postgRESTQuery;
      if (sort) params.set("order", sort);
      continue;
    }
    if (param === "client") {
      const values = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      if (values.length) params.append("client", `in.(${values.join(",")})`);
      continue;
    }
    if (param === "position") {
      const values = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      if (values.length) params.append("position", `in.(${values.join(",")})`);
      continue;
    }
    if (param === "searchMember") {
      params.append("fullName", `ilike.*${value}*`);
      continue;
    }
    if (param === "startingDate") {
      params.append("startingDate", `gte.${value}`);
    }
  }
  if (!params.has("order")) params.set("order", "startingDate.desc");

  return params.toString();
};
