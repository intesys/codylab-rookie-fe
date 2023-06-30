import { Grid } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { PatientDTO, PatientFilterDTO } from "../../generated/axios";
import BreadcrumbEl from "../Breadcumb/BreadcrumbEl";
import Breadcrumb from "../Breadcumb/breadcrumb";
import PatientBox from "./PatientBox/index";
import { Action, patientsFilterReducer } from "./lib";

const patientsList: PatientDTO[] = [
  {
    id: 1,
    opd: 1111,
    idp: 100000,
    name: "Carlo",
    surname: "Cracco",
  },
  {
    id: 2,
    opd: 2222,
    idp: 200000,
    name: "Joe",
    surname: "Bastianich",
  },
  {
    id: 3,
    opd: 3333,
    idp: 300000,
    name: "Antonino",
    surname: "Canavvaciulo",
  },
  {
    id: 4,
    opd: 4444,
    idp: 400000,
    name: "Bruno",
    surname: "Barbieri",
  },
  {
    id: 5,
    opd: 5555,
    idp: 500000,
    name: "Francesco",
    surname: "Locatelli",
  },
  {
    id: 6,
    opd: 6666,
    idp: 600000,
    name: "Antonia",
    surname: "Klugman",
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
