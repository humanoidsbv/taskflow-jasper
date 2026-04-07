"use server";

import { revalidatePath } from "next/cache";

import { buildQueryParams } from "@/utils/utils";
import { CreatedMember, MemberData } from "@/types/dataTypes";

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
  member: MemberData & { fullName: string },
): Promise<{ message: string; errors: {} }> => {
  try {
    const requestResult = await fetch("http://localhost:3004/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
    if (!requestResult.ok) {
      const resultText = await requestResult.text();
      return {
        message: "Failed to create member",
        errors: { server: [resultText || "Unknown server error"] },
      };
    }

    revalidatePath("/");

    return {
      message: "Member added",
      errors: {},
    };
  } catch (error) {
    return {
      message: "Network error while creating member",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};

export const editMember = async (
  member: CreatedMember,
): Promise<{ message: string; errors: {} }> => {
  return {
    message: "",
    errors: {},
  };
};
