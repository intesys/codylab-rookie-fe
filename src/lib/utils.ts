import { HOME_PATH } from "../config/paths";
import { PatientBloodGroupEnum } from "../generated/axios";

export const generateAvatarImage = (size = 150, type: "d" | "p", id?: number) =>
  id ? `https://i.pravatar.cc/${size}?u=${type}${id}` : "";

export function getPath(section: string): string {
  return `${HOME_PATH}${section}`;
}

export function getDetailPath(section: string, id?: string | number): string {
  return `${getPath(section)}/${id ?? 0}`;
}

export function getNewDetailPath(section: string): string {
  return `${getPath(section)}/new`;
}

export function getNewRecordPath(section: string, id?: string | number): string {
  return `${getDetailPath(section, id)}/record/new`;
}

export function getBloodType(bloodType: PatientBloodGroupEnum): string {
  switch (bloodType) {
    case PatientBloodGroupEnum.APlus:
      return "A+";
    case PatientBloodGroupEnum.BPlus:
      return "B+";
    case PatientBloodGroupEnum.AMinus:
      return "A-";
    case PatientBloodGroupEnum.BMinus:
      return "B-";
    case PatientBloodGroupEnum.AbPlus:
      return "AB+";
    case PatientBloodGroupEnum.AbMinus:
      return "AB-";
    case PatientBloodGroupEnum.ZeroPlus:
      return "0+";
    case PatientBloodGroupEnum.ZeroMinus:
      return "0-";
    default:
      return "";
  }
}
