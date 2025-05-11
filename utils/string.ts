export function capitalizeFirstLetter(text?: string) {
  if (!text) return "";
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

export function convertStringSpace(
  text?: string,
  separator = "-",
  newSeparator = " "
) {
  if (!text) return "";
  return String(text).replace(separator, newSeparator);
}

export const renderDetail = (data?: any): string => {
  if (!data || typeof data !== "string") return "-";

  return data;
};
