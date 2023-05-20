import { Reducer } from "react";
import { PatientFilter } from "../../generated/axios";

export interface Action {
  type: "SET_FILTER";
  payload?: PatientFilter;
}

export const patientsFilterReducer: Reducer<PatientFilter, Action> = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload || state;
  }
};
