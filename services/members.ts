"use server";

import { CreatedMember, MemberData } from "@/types/dataTypes";
import { filterOptions, membersSortByOptions } from "./queries";
import { buildQueryParams } from "@/utils/utils";
import { revalidatePath } from "next/cache";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const getPositions = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      "http://localhost:3004/members?_sort=position",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = (await response.json()) as CreatedMember[];

    return [...new Set(result.map((entry) => entry.position))];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getClientsFromMembers = async (): Promise<string[]> => {
  try {
    const response = await fetch("http://localhost:3004/members?_sort=client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = (await response.json()) as CreatedMember[];

    return [...new Set(result.map((entry) => entry.client))];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMembers = async (
  searchParams?: Promise<{ [key: string]: string }>,
): Promise<CreatedMember[]> => {
  const baseURL = `http://localhost:3004/members`;
  const queryParams = buildQueryParams(await searchParams);

  try {
    const response = await fetch(`${baseURL}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      throw new NotFoundError("Members not found!");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createMember = async (
  member: MemberData,
): Promise<{ message: string; errors: {} }> => {
  console.table(member);

  revalidatePath("/");
  return {
    message: "Member added",
    errors: {},
  };
};
