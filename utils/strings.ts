export function truncateAddress(
  address: string,
  startLength = 6,
  endLength = 4,
): string {
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength,
  )}`
}
