/**
 * فرمت قیمت به فارسی
 */
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("fa-IR").format(numPrice);
}

/**
 * تبدیل عدد به فارسی
 */
export function toPersianDigits(num: number | string): string {
  return new Intl.NumberFormat("fa-IR").format(typeof num === "string" ? parseFloat(num) : num);
}
/** Convert Latin digits inside a string to Persian digits */
export function faDigits(input: string): string {
  return input.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}