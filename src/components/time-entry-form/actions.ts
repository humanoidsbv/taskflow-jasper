"use server";

export const createCalendarEvent = async (
  formData: FormData,
): Promise<void> => {
  const client = formData.get("client");
  console.log(client);
};
