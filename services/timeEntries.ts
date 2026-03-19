import { TimeEntryData } from "@/types/dataTypes";

export async function getTimeEntries(): Promise<TimeEntryData[]> {
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
      throw new NotFoundError("Pls help I am under da water");
    }
    console.log("succes");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
