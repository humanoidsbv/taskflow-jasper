"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { CreatedTimeEntry, TimeEntryData } from "@/types/dataTypes";
import { buildQueryParams } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const getClientsFromTimeEntries = async (): Promise<string[]> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("time-entries").select();
  if (error) throw error;

  return [...new Set(data.map((entry) => entry.client))];
};

export const getTimeEntries = async (
  searchParams?: Promise<{ [key: string]: string }>,
): Promise<CreatedTimeEntry[]> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const baseURL = `https://my-json-server.typicode.com/MrJasperge/taskflow-db/time-entries`;
  const queryParams = buildQueryParams(await searchParams);

  const { data, error } = await supabase.from("time-entries").select();

  if (error) throw error;
  return data ?? [];

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
