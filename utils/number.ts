import Currency from "currency.js";

export function formatNumber(value: number, opts?: Currency.Options) {
  return Currency(value, {
    pattern: "#",
    negativePattern: "-#",
    precision: value % 2 === 0 ? 0 : 2,
    ...opts,
  }).format();
}

export function formatCurrency(value: number, opts?: Currency.Options) {
  return formatNumber(value, {
    pattern: "# THB",
    negativePattern: "-# THB",
    ...opts,
  });
}
