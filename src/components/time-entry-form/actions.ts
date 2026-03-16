"use server";

export const createCalendarEvent = async (
  formData: FormData,
): Promise<void> => {
  const data = Object.fromEntries(formData);

  console.table(data);
};
