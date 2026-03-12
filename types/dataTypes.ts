export type TimeEntryType = {
  id: number;
  client: string;
  startTimestamp: string;
  stopTimestamp: string;
  billable: boolean;
  department: string;
};

export type FormattedTimeEntryType = Omit<
  TimeEntryType,
  "startTimestamp" | "stopTimestamp"
> & {
  timeInterval: string;
  totalTime: string;
};

export type TimeEntriesType = TimeEntryType[];
