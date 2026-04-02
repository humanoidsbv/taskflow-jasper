"use server";

import { z } from "zod";

import { createTimeEntry } from "./timeEntries";
import {
  MemberData,
  TimeEntryData,
  ValidatedDataType,
} from "@/types/dataTypes";
import { createMember } from "./members";

export interface CreateCalendarEventState {
  errors: Partial<Record<string, string[]>>;
  message: string;
  values?: Partial<ValidatedDataType>;
}

export interface CreateMemberState {
  errors: Partial<Record<string, string[]>>;
  message: string;
  values?: Partial<MemberData>;
}

const minutes = (time: string) => {
  return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
};

const calendarSchema = z
  .object({
    client: z.string().refine((client) => client.length > 0, {
      error: "Client is required",
    }),
    activity: z.string().refine(
      (activity) => {
        const splitActivity = activity.split("-");
        return (
          activity.length > 2 &&
          splitActivity.length === 2 &&
          splitActivity[0].length > 0 &&
          splitActivity[1].length > 0
        );
      },
      {
        error: "Activity should be in form 'department-billable'",
      },
    ),
    date: z.iso.date(),
    startTime: z.iso.time(),
    stopTime: z.iso.time(),
  })
  .superRefine((data, ctx) => {
    if (minutes(data.stopTime) <= minutes(data.startTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stopTime"],
        message: "Stop time must be later than start time",
      });
    }
  });

const memberSchema = z.object({
  client: z.string(),
  eMail: z.email(),
  firstName: z.string(),
  info: z.string(),
  lastName: z.string(),
  position: z.string(),
  startingDate: z.string(),
});

const formatCalendarData = (
  validatedData: ValidatedDataType,
): TimeEntryData => {
  return {
    billable: validatedData.activity.split("-")[1] === "billable",
    client: validatedData.client,
    department: validatedData.activity.split("-")[0],
    startTimestamp: new Date(
      `${validatedData.date}T${validatedData.startTime}Z`,
    ).toISOString(),
    stopTimestamp: new Date(
      `${validatedData.date}T${validatedData.stopTime}Z`,
    ).toISOString(),
  };
};

export const createCalendarEvent = async (
  _prevState: CreateCalendarEventState,
  formData: FormData,
): Promise<CreateCalendarEventState> => {
  const data = Object.fromEntries(formData);
  const validatedData = calendarSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      message: "Error validating data",
      errors: z.flattenError(validatedData.error).fieldErrors,
      values: data,
    };
  }

  const response = await createTimeEntry(
    formatCalendarData(validatedData.data),
  );

  return { message: response.message, errors: response.errors, values: {} };
};

export const createMemberEvent = async (
  _prevState: CreateMemberState,
  formData: FormData,
): Promise<CreateMemberState> => {
  const data = Object.fromEntries(formData);
  const mockData = {
    client: "De Testoverheid",
    eMail: "test@test.com",
    firstName: "Test",
    info: "Dit is een test",
    lastName: "De Tester",
    position: "Tester",
  };

  const validatedData = memberSchema.safeParse(data);

  if (!validatedData.success) {
    console.log("no!");
    return {
      message: "Error validating data",
      errors: z.flattenError(validatedData.error).fieldErrors,
      values: data,
    };
  }

  console.log("yes!");
  const response = await createMember(validatedData.data);

  return { message: response.message, errors: response.errors, values: {} };
};
