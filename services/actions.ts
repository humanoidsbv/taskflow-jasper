"use server";

import { z } from "zod";

import {
  MemberData,
  TimeEntryData,
  ValidatedDataType,
} from "@/types/dataTypes";
import { createMember, editMember } from "./members";
import { createTimeEntry } from "./timeEntries";
import { formatFullName } from "@/utils/utils";

export interface CreateCalendarEventState {
  errors: Partial<Record<string, string[]>>;
  message: string;
  values?: Partial<ValidatedDataType>;
}

export interface CreateMemberState {
  errors: Partial<Record<string, string[]>>;
  message: string;
  values?: Partial<MemberData>;
  id?: string;
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
  client: z.string().trim(),
  eMail: z.email(),
  firstName: z.string().trim().min(1),
  id: z.string(),
  info: z.string().max(150),
  lastName: z.string().trim().min(1),
  position: z.string().trim(),
  startingDate: z.iso.datetime(),
});

const fullNameSchema = z
  .string()
  .trim()
  .refine((name) => name.split(" ").length >= 2);

const formatFullNameData = (firstName: string, lastName: string): string => {
  const fullName = formatFullName(firstName, lastName);
  return fullNameSchema.safeParse(fullName).success
    ? fullName
    : `${firstName} ${lastName}`;
};

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
  const startingDate = new Date().toISOString();
  data.startingDate = startingDate;

  const validatedData = memberSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      message: "Error validating data",
      errors: z.flattenError(validatedData.error).fieldErrors,
      values: data,
    };
  }
  const fullName = formatFullNameData(
    validatedData.data.firstName,
    validatedData.data.lastName,
  );

  const response = await createMember({ ...validatedData.data, fullName });

  return { message: response.message, errors: response.errors, values: {} };
};

export const editMemberEvent = async (
  _prevState: CreateMemberState,
  formData: FormData,
): Promise<CreateMemberState> => {
  const data = Object.fromEntries(formData);
  if (!data.id) return { message: "No ID", errors: {} };

  const validatedData = memberSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      message: "Error validating data",
      errors: z.flattenError(validatedData.error).fieldErrors,
      values: data,
    };
  }
  const fullName = formatFullNameData(
    validatedData.data.firstName,
    validatedData.data.lastName,
  );

  console.log("Editing member ", validatedData.data.id);

  const response = await editMember({
    ...validatedData.data,
    fullName,
  });

  return { message: response.message, errors: response.errors, values: {} };
};
