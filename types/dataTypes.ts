export type TimeEntryType = {
    id: number,
    client: string,
    startTimestamp: string,
    stopTimestamp: string,
    billable: boolean
}

export type TimeEntriesType = TimeEntryType[];