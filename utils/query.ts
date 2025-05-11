/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildQuery = (
  params?: Record<string, any>,
  prefix = ""
): string => {
  const query: string[] = [];

  if (!params) return "";

  Object.entries(params).forEach(([key, value]) => {
    const paramKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      value.forEach((val, index) => {
        if (typeof val === "object") {
          query.push(buildQuery(val, `${paramKey}[${index}]`));
        } else {
          query.push(
            `${encodeURIComponent(`${paramKey}[${index}]`)}=${encodeURIComponent(val)}`
          );
        }
      });
    } else if (typeof value === "object" && value !== null) {
      query.push(buildQuery(value, paramKey));
    } else {
      query.push(
        `${encodeURIComponent(paramKey)}=${encodeURIComponent(value)}`
      );
    }
  });

  return query.join("&");
};
