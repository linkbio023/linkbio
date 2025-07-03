export function dateFormatter(givenDate) {
  if (!givenDate) return "";

  const date = new Date(givenDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
