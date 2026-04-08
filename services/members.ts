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

const REST_URL = `${process.env.SUPABASE_URL}/rest/v1/members`;
const API_KEY = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

const restHeaders = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const getPositions = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${REST_URL}`, {
      method: "GET",
      headers: restHeaders,
    });
    const result = (await response.json()) as CreatedMember[];

    return [...new Set(result.map((entry) => entry.position))];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getClientsFromMembers = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${REST_URL}?order=client`, {
      method: "GET",
      headers: restHeaders,
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
  const queryParams = buildQueryParams(await searchParams);

  try {
    const response = await fetch(`${REST_URL}?${queryParams}`, {
      method: "GET",
      headers: restHeaders,
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
    const requestResult = await fetch(`${REST_URL}`, {
      method: "POST",
      headers: restHeaders,
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
  try {
    const requestResult = await fetch(`${REST_URL}/${member.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
    if (!requestResult.ok) {
      const resultText = await requestResult.text();
      return {
        message: "Failed to edit member",
        errors: { server: [resultText || "Unknown server error"] },
      };
    }

    revalidatePath("/");

    return {
      message: "Member edited",
      errors: {},
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Network error while editing member",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
