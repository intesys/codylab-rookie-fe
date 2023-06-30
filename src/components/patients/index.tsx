import React, { Dispatch, useMemo, useReducer } from "react";
import { PatientDTO, PatientFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, patientsFilterReducer } from "./lib";

const PatientsList: PatientDTO[] = [
  {
    id: 1,
    name: "Pietro",
    surname: "Saccomando",
  },

  {
    id: 2,
    name: "Aldo",
    surname: "Maira",
  },
  {
    id: 3,
    name: "Pierdavide",
    surname: "Roccaro",
  },
  {
    id: 4,
    name: "Stefano",
    surname: "Sanfilippo",
  },
  {
    id: 5,
    name: "Filippo",
    surname: "Dolci",
  },
];

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>
      {/* Patients filter form */}
      {/* Patients list */}
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
