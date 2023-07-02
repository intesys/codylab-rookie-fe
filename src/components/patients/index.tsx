import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { PatientDTO, PatientFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, patientsFilterReducer } from "./lib";
import { Avatar, Grid } from "@mui/material";
import PatientBox from "./PatientBox";


const patientsList: PatientDTO[] = [
  {
    id: 1,
    opd: 1031,
    idp: 100000,
    name: "Richmond",
    surname: "Zoogah",
    
  },
  {
    id: 2,
    opd: 2121,
    idp: 200000,
    name: "Solomon",
    surname: "Dalton",
  },
  {
    id: 3,
    opd: 3433,
    idp: 300000,
    name: "Richard",
    surname: "Abc",
  },
 
  {
    id: 4,
    opd: 4300,
    idp: 600000,
    name: "Paul",
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
