import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export async function getTimeEntries(): Promise<CreatedTimeEntry[]> {
  try {
    const response = await fetch(
      "http://localhost:3004/time-entries?_sort=-startTimestamp",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 404) {
      throw new NotFoundError("Time entry not found!");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createTimeEntry(
  timeEntry: TimeEntryData,
  options?: {
    baseUrl?: string;
    signal?: AbortSignal;
  },
): Promise<CreatedTimeEntry> {
  const requestResult = await fetch("http://localhost:3004/time-entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timeEntry),
    signal: options?.signal,
  });

  if (!requestResult.ok) {
    const resultText = await requestResult.text();
    throw new Error(
      `Failed to create time entry: ${requestResult.status} ${resultText}`,
    );
  }

  return (await requestResult.json()) as CreatedTimeEntry;
}
