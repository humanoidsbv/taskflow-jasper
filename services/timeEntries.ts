"use server";

import { revalidatePath } from "next/cache";

import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import { buildQueryParams } from "@/utils/utils";

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
  const queryParams = buildQueryParams(await searchParams);

  try {
    const response = await fetch(`${REST_URL}?${queryParams}`, {
      method: "GET",
      headers: restHeaders,
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
    const response = await fetch(
      `https://my-json-server.typicode.com/MrJasperge/taskflow-db/time-entries/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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
    const requestResult = await fetch(
      "https://my-json-server.typicode.com/MrJasperge/taskflow-db/time-entries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeEntry),
      },
    );
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
