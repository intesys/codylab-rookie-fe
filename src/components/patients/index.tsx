import { Button, CircularProgress, Grid, Toolbar, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { api } from "../../config/api";
import { PatientFilterDTO } from "../../generated/axios";
import useGetList from "../../hooks/useGetList";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import PatientBox from "./PatientBox";
import PatientFilterForm from "./PatientsFilterForm";
import { Action, patientsFilterReducer } from "./lib";

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const getPatientList = api.patients.getListPatient;

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patientList, loading] = useGetList(getPatientList, filter);

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>

      <Grid item xs={15}>
        <Toolbar style={{ padding: "0" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            <strong>PATIENTS DATABASE</strong>
          </Typography>
          <Button variant="contained" color="primary">
            Add new patient
          </Button>
        </Toolbar>
      </Grid>

      {/* patient filter form */}

      <Grid item xs={12}>
        <PatientFilterForm />
      </Grid>

      {/* patient list */}
      <Grid container mt={4} spacing={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          patientList.map((patient) => (
            <Grid item xs={4} key={patient.id}>
              <PatientBox props={{ patient }} />
            </Grid>
          ))
        )}
      </Grid>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
