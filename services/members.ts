"use server";

import { CreatedMember } from "@/types/dataTypes";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const getMembers = async (
  searchParams?: Promise<{
    sort_by?: string;
    client?: string;
    position: string;
    search: string;
    startingDate: string;
  }>,
): Promise<CreatedMember[]> => {
  const baseURL = `http://localhost:3004/members`;
  const params = new URLSearchParams();
  const inputParams = await searchParams;

  params.append("_sort", "-startingDate");

  try {
    const response = await fetch(`${baseURL}?${params.toString()}`, {
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
