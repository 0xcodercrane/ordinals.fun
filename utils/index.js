export function addressFormat(address, length) {
  const formattedAddress = address.slice(0, length) + "..." + address.slice(-length);
  return formattedAddress;
}
