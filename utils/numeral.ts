export function toPrice(num: number | string, decimals = 2): string {
  return Number(num).toFixed(decimals)
}
