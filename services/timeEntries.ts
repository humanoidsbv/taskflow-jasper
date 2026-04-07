"use server";

import { revalidatePath } from "next/cache";

import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import { buildQueryParams } from "@/utils/utils";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const getClientsFromTimeEntries = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      "http://localhost:3004/time-entries?_sort=client",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = (await response.json()) as CreatedTimeEntry[];

    return [...new Set(result.map((entry) => entry.client))];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTimeEntries = async (
  searchParams?: Promise<{ [key: string]: string }>,
): Promise<CreatedTimeEntry[]> => {
  const baseURL = `http://localhost:3004/time-entries`;
  const queryParams = buildQueryParams(await searchParams);

  try {
    const response = await fetch(`${baseURL}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      throw new NotFoundError("Time entry not found!");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function deleteTimeEntry(id: string) {
  try {
    const response = await fetch(`http://localhost:3004/time-entries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      throw new NotFoundError("Time entry not found!");
    }
    revalidatePath("/");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createTimeEntry(
  timeEntry: TimeEntryData,
): Promise<{ message: string; errors: {} }> {
  try {
    const requestResult = await fetch("http://localhost:3004/time-entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeEntry),
    });
    if (!requestResult.ok) {
      const resultText = await requestResult.text();
      return {
        message: "Failed to create time entry",
        errors: { server: [resultText || "Unknown server error"] },
      };
    }

    revalidatePath("/");

    return {
      message: "Event created",
      errors: {},
    };
  } catch (error) {
    return {
      message: "Network error while creating time entry",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
}
