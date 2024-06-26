import { PatientFilterDTO } from "@generated/axios";
import { Reducer } from "react";

export interface Action {
  type: "SET_FILTER";
  payload?: PatientFilterDTO;
}

export const patientsFilterReducer: Reducer<PatientFilterDTO, Action> = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload || state;
  }
};
