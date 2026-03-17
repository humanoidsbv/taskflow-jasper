"use server";

import { z } from "zod";

const schema = z.object({
  client: z
    .string()
    .refine((client) => client !== "test" && client.length > 0, {
      message: "Test",
    }),
  department: z.string(),
  billable: z.boolean(),
  startTimestamp: z.coerce.date().refine((date) => date, {
    error: "Invalid date format used!",
  }),
  stopTimestamp: z.coerce.date().refine((date) => date, {
    error: "Invalid date format used!",
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
  const waitFor = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  await waitFor(2000);

  const data = Object.fromEntries(formData);
  console.table(data);

  const formattedData = {
    client: data.client,
    startTimestamp: new Date(`${data.date}T${data.startDate}`),
    stopTimestamp: new Date(`${data.date}T${data.stopDate}`),
    billable: data.activity.toString().split("-")[1] === "billable",
    department: data.activity.toString().split("-")[0],
  };

  const validatedData = schema.safeParse(formattedData);

  if (!validatedData.success) {
    console.table(z.treeifyError(validatedData.error).errors);
    return {
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error).errors,
    };
  }

  console.table(validatedData);

  return { message: "Event created" };
};
