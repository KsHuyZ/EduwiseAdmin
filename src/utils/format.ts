export function removeEmptyParams(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== ''),
  );
}
