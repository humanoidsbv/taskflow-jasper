"use server";

import { revalidatePath } from "next/cache";

import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import { sortByOptions } from "./translations";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const getTimeEntries = async (
  searchParams?: Promise<{
    sort_by?: string;
    client?: string;
    date?: string;
    search?: string;
  }>,
): Promise<CreatedTimeEntry[]> => {
  const baseURL = `http://localhost:3004/time-entries`;
  const params = new URLSearchParams();
  const inputParams = await searchParams;

  params.append("_sort", "-startTimestamp");

  if (inputParams?.search) params.set("client:contains", inputParams.search);
  if (inputParams?.client) params.set("client", inputParams.client);
  if (inputParams?.date)
    params.set("startTimestamp:contains", inputParams.date);
  if (inputParams?.sort_by) {
    const query = sortByOptions.find(
      (option) => option.value === inputParams.sort_by,
    )?.query;
    if (query) params.set("_sort", query);
  }

  try {
    const response = await fetch(`${baseURL}?${params.toString()}`, {
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
  options?: {
    baseUrl?: string;
    signal?: AbortSignal;
  },
): Promise<{ message: string; errors: {} }> {
  try {
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
