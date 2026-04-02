"use server";

import { CreatedMember, MemberData } from "@/types/dataTypes";
import { membersSortByOptions } from "./translations";

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

    return ((await response.json()) as CreatedMember[])
      .map((entry) => entry.position)
      .filter((value, index, array) => array.indexOf(value) === index);
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

    return ((await response.json()) as CreatedMember[])
      .map((entry) => entry.client)
      .filter((value, index, array) => array.indexOf(value) === index);
  } catch (error) {
    console.error(error);
    return [];
  }
};

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

  if (inputParams?.search)
    params.append("fullName:contains", inputParams.search);
  if (inputParams?.client) params.append("client:in", inputParams.client);
  if (inputParams?.position) params.append("position:in", inputParams.position);
  if (inputParams?.startingDate)
    params.set("startingDate:gt", inputParams.startingDate);
  if (inputParams?.sort_by) {
    const query = membersSortByOptions.find(
      (option) => option.value === inputParams.sort_by,
    )?.query;
    if (query) params.set("_sort", query);
  }

  params.append("_sort", "startingDate");

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

export const createMember = async (
  member: MemberData,
): Promise<{ message: string; errors: {} }> => {
  console.table(member);
  return {
    message: "Member added",
    errors: {},
  };
};
