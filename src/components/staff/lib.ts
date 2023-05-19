import { Reducer } from "react";
import { DoctorFilter } from "../../generated/axios";

export interface Action {
  type: "SET_FILTER";
  payload?: DoctorFilter;
}

export const staffFilterReducer: Reducer<DoctorFilter, Action> = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload || state;
  }
};
