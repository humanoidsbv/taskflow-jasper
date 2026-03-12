export const getElapsedTime = (
  startDate: Date,
  stopDate: Date,
): {
  elapsedHours: number;
  elapsedMinutes: number;
} => {
  const elapsedMs = stopDate.getTime() - startDate.getTime();
  const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
  const elapsedHours = Math.floor(totalMinutes / 60);
  const elapsedMinutes = totalMinutes % 60;

  return { elapsedHours, elapsedMinutes };
};

export const formatElapsedTime = (startDate: Date, stopDate: Date): string => {
  const { elapsedHours, elapsedMinutes } = getElapsedTime(startDate, stopDate);
  return `${elapsedHours.toString().padStart(2, "0")}:${elapsedMinutes.toString().padStart(2, "0")}`;
};

export const formatHours = (elapsedHours: number): string => {
  const elapsedMinutes = elapsedHours * 60;
  const hours = Math.floor(elapsedMinutes / 60);
  const minutes = elapsedMinutes % 60;
  return `${hours.toFixed(0).toString().padStart(2, "0")}:${minutes.toFixed(0).toString().padStart(2, "0")}`;
};

export const dateFormat = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "numeric",
  timeZone: "Europe/Amsterdam",
  weekday: "long",
});

export const timeFormat = new Intl.DateTimeFormat("nl-NL", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Amsterdam",
});

export const capitalizeString = (text: string) =>
  `${text.at(0)?.toUpperCase()}${text.slice(1)}`;
