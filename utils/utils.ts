export const getElapsedTime = (
  startDate: Date,
  stopDate: Date,
): {
  elapsedHours: number;
  elapsedMinutes: number;
} => {
  const elapsedMs = stopDate.getTime() - startDate.getTime();
  const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
  const elapsedHours = Math.floor(totalMinutes / 60);
  const elapsedMinutes = totalMinutes % 60;
  return { elapsedHours, elapsedMinutes };
};
