import { HOME_PATH, PATIENTS_RECORDS_PATH } from "../config/paths";
import { PatientDTOBloodGroupEnum } from "../generated/axios";

export const generateAvatarImage = (type: "d" | "p", id?: number) =>
  id ? `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${type}${id}` : "";

export function getPath(section: string): string {
  return `${HOME_PATH}${section}`;
}

export function getDetailPath(section: string, id?: string | number): string {
  return `${getPath(section)}/${id ?? 0}`;
}

export function getNewDetailPath(section: string): string {
  return `${getPath(section)}/new`;
}
export function getEditDetailPath(section: string, id?: string | number): string {
  return `${getDetailPath(section, id)}/edit`;
}

export function getNewRecordDetailPath(section: string, idPatient?: string | number): string {
  return `${getDetailPath(section, idPatient)}/${PATIENTS_RECORDS_PATH}/new`;
}

export function getEditRecordDetailPath(
  section: string,
  idPatient?: string | number,
  idPatientRecord?: string | number
): string {
  return `${getDetailPath(section, idPatient)}/${PATIENTS_RECORDS_PATH}/${idPatientRecord}/edit`;
}

export function getBloodType(bloodType: PatientDTOBloodGroupEnum): string {
  switch (bloodType) {
    case PatientDTOBloodGroupEnum.APlus:
      return "A+";
    case PatientDTOBloodGroupEnum.BPlus:
      return "B+";
    case PatientDTOBloodGroupEnum.AMinus:
      return "A-";
    case PatientDTOBloodGroupEnum.BMinus:
      return "B-";
    case PatientDTOBloodGroupEnum.AbPlus:
      return "AB+";
    case PatientDTOBloodGroupEnum.AbMinus:
      return "AB-";
    case PatientDTOBloodGroupEnum.ZeroPlus:
      return "0+";
    case PatientDTOBloodGroupEnum.ZeroMinus:
      return "0-";
    default:
      return "";
  }
}
