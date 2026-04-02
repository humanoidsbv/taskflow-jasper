export type TimeEntryData = {
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

export type CreatedTimeEntry = TimeEntryData & { id: string };

export type MemberData = {
  client: string;
  eMail: string;
  firstName: string;
  info: string;
  lastName: string;
  position: string;
  startingDate: string;
};

export type FormattedMemberData = Omit<MemberData, "startingDate"> & {
  startingMonth: string;
};

export type CreatedMember = MemberData & { id: string; fullName: string };
