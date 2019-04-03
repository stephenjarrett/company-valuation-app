export function getYearRange(): number[] {
  const max = new Date().getFullYear();
  const min = max - 300;
  return Array.from({ length: max - min + 1 }, (v, k) => k + min);
}
