export type TimeEntryData = {
  id: number;
  client: string;
  startTimestamp: string;
  stopTimestamp: string;
  billable: boolean;
  department: string;
};

export type FormattedTimeEntryData = Omit<
  TimeEntryData,
  "startTimestamp" | "stopTimestamp"
> & {
  timeInterval: string;
  totalTime: string;
};

export type ValidatedDataType = {
  activity: string;
  client: string;
  date: string;
  startTime: string;
  stopTime: string;
};
