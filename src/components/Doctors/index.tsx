import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { DoctorDTO, DoctorFilterDTO, PatientFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "./lib";
import { Grid } from "@mui/material";
import PatientBox from "../Patients/PatientBox";
import { patientsFilterReducer } from "../Patients/lib";

const patientsList: DoctorDTO[] = [
  {
    id: 1,
    name: "Richmond",
    surname: "Zoogah",
    
  },
  {
    id: 2,
    name: "Matteo",
    surname: "Ocneanu",
  },
  {
    id: 3,
    name: "Regina",
    surname: "Abc",
  },
 
  {
    id: 4,
    name: "Richard",
    surname: "Graham",
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
  const [loading, setLoading] = useState(false);
  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>

      <Grid container mt={4} spacing={2}>
        {loading ? (
          <>Loading</>
        ) : (
          patientsList.map((patient) => (
            <Grid item key={patient.id} xs={4}>
              <PatientBox props={{ patient }} />
            </Grid>
          ))
        )}
      </Grid>
    </PatientsFilterContext.Provider>
  );
};
export default Patients;
