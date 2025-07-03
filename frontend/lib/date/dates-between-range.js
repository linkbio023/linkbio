// fast and efficient way to get all dates between two dates

export function datesBetweenRange(startDate, endDate) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error("Both arguments should be of type Date");
  }

  const days = Math.floor((endDate - startDate) / 86400000); // 24*60*60*1000 = 86400000 milliseconds in a day

  return Array.from({ length: days + 1 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
}
