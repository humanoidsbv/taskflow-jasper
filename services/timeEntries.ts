"use server";

import { revalidatePath } from "next/cache";

import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import { buildTimeEntriesQueryParams } from "@/utils/utils";

const REST_URL = `${process.env.SUPABASE_URL}/rest/v1/time-entries`;
const API_KEY = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

const restHeaders = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const getClientsFromTimeEntries = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${REST_URL}?order=client`, {
      method: "GET",
      headers: restHeaders,
    });
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
  const queryParams = buildTimeEntriesQueryParams(await searchParams);

  try {
    const response = await fetch(`${REST_URL}?${queryParams}`, {
      method: "GET",
      headers: restHeaders,
    });
    if (response.status === 404) {
      throw new NotFoundError("Time entries not found!");
    }
    const acquiredRows = (await response.json()) as CreatedTimeEntry[];
    return acquiredRows ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function deleteTimeEntry(id: string) {
  try {
    const response = await fetch(`${REST_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: { ...restHeaders, Prefer: "return=representation" },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const deletedRows = (await response.json()) as CreatedTimeEntry[];
    revalidatePath("/");
    return deletedRows[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createTimeEntry(
  timeEntry: TimeEntryData,
): Promise<{ message: string; errors: {} }> {
  try {
    const response = await fetch(`${REST_URL}`, {
      method: "POST",
      headers: restHeaders,
      body: JSON.stringify(timeEntry),
    });
    if (!response.ok) {
      const resultText = await response.text();
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
    console.error(error);
    return {
      message: "Network error while creating time entry",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
}
