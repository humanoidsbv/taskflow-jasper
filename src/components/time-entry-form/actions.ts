"use server";

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
