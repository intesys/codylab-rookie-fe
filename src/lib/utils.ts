export const generateAvatarImage = (size = 150, type: "d" | "p", id?: number) =>
  id ? `https://i.pravatar.cc/${size}?u=${type}${id}` : "";
