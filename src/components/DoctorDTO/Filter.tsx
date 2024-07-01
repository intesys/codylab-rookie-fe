import { DoctorFilterDTO } from "../../generated/axios";

export interface Action {
  type: "SET_FILTER";
  payload: Partial<DoctorFilterDTO>;
}

export function doctorsFilterReducer(state: DoctorFilterDTO, action: Action): DoctorFilterDTO {
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
