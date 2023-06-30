import { Grid } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { PatientDTO, PatientFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import PatientBox from "./PatientBox/index";
import { Action, patientsFilterReducer } from "./lib";

const patientsList: PatientDTO[] = [
  {
    id: 1,
    opd: 2334,
    idp: 64464,
    name: "Lionel",
    surname: "Messi",
  },

  {
    id: 2,
    opd: 2334,
    idp: 64364,
    name: "Nicolò",
    surname: "Barella",
  },
  {
    id: 3,
    opd: 2334,
    idp: 64364,
    name: "Cristiano",
    surname: "Ronaldo",
  },
  {
    id: 4,
    opd: 2334,
    idp: 64364,
    name: "Kylian",
    surname: "Mbappè",
  },
  {
    id: 5,
    opd: 2334,
    idp: 64364,
    name: "Lautaro",
    surname: "Martinez",
  },
  {
    id: 6,
    opd: 2334,
    idp: 64364,
    name: "Paulo",
    surname: "Dybala",
  },
  {
    id: 7,
    opd: 2334,
    idp: 64364,
    name: "Romelu",
    surname: "Lukaku",
  },
  {
    id: 8,
    opd: 2334,
    idp: 64364,
    name: "Federico",
    surname: "Dimarco",
  },
  {
    id: 9,
    opd: 2334,
    idp: 64364,
    name: "Davide",
    surname: "Frattesi",
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
