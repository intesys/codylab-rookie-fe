import { PatientFilterDTO } from "@generated/axios";

export interface Action {
  type: "SET_FILTER";
  payload: Partial<PatientFilterDTO>;
}

export function patientsFilterReducer(state: PatientFilterDTO, action: Action): PatientFilterDTO {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
