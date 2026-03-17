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

export const createCalendarEvent = async (
  formData: FormData,
): Promise<void> => {
  const data = Object.fromEntries(formData);

  const formattedData = {
    client: data.client,
    startTimestamp: new Date(`${data.date}T${data.startDate}`).toISOString(),
    stopTimestamp: new Date(`${data.date}T${data.stopDate}`).toISOString(),
    billable: data.activity.toString().split("-")[1] === "billable",
    department: data.activity.toString().split("-")[0],
  };

  console.table(formattedData);
};
