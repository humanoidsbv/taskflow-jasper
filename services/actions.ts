import { z } from "zod";

import { TimeEntryData, ValidatedDataType } from "@/types/dataTypes";
import { createTimeEntry } from "./timeEntries";

interface CreateCalendarEventState {
  message: string;
  errors?: string[];
}

const minutes = (time: string) => {
  return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
};

const schema = z
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
  .refine((data) => minutes(data.stopTime) - minutes(data.startTime) > 0, {
    error: "Start time should be earlier than stop time",
    path: ["startTime", "stopTime"],
  });

const formatData = (validatedData: ValidatedDataType): TimeEntryData => {
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

  const validatedData = schema.safeParse(data);

  if (!validatedData.success) {
    return {
      message: validatedData.error.issues
        .map((error) => error.message)
        .join(", "),
      errors: z.treeifyError(validatedData.error).errors,
    };
  }

  const formattedData = formatData(validatedData.data);

  const newEntry = await createTimeEntry(formattedData);

  return { message: "Event created", errors: [] };
};
