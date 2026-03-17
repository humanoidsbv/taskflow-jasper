"use server";

import { z } from "zod";

const schema = z.object({
  client: z.string(),
  department: z.string(),
  billable: z.boolean(),
  startTimestamp: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  stopTimestamp: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

interface CreateCalendarEventState {
  message: string;
  errors?: string[];
}

export const createCalendarEvent = async (
  _prevState: CreateCalendarEventState,
  formData: FormData,
): Promise<CreateCalendarEventState> => {
  console.table(formData);
  const data = Object.fromEntries(formData);

  const validatedData = schema.safeParse({
    client: data.client,
    startTimestamp: new Date(`${data.date}T${data.startDate}`).toISOString(),
    stopTimestamp: new Date(`${data.date}T${data.stopDate}`).toISOString(),
    billable: data.activity.toString().split("-")[1] === "billable",
    department: data.activity.toString().split("-")[0],
  });
  if (!validatedData.success) {
    return {
      message: "Invalid form values",
      errors: z.treeifyError(validatedData.error).errors,
    };
  }

  console.table(validatedData);

  return { message: "Event created" };
};
