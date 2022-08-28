export function getRegionName(regionName?: string) {
  if (!regionName) return '';
  return regionName.split(' ').pop();
}
