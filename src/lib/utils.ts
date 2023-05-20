export const generateAvatarImage = (size = 150, type: "d" | "p", id?: number) =>
  id ? `https://i.pravatar.cc/${size}?u=${type}${id}` : "";

export function getDetailPath(section: string, id?: string | number): string {
  return `${section}/${id ?? 0}`;
}
