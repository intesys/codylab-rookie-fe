import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid, Toolbar } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { Link } from "react-router-dom";
import { api } from "../../config/api";
import { PATIENTS_PATH } from "../../config/paths";
import { PatientFilterDTO } from "../../generated/axios";
import useGetList from "../../hooks/useGetList";
import { getNewDetailPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../Layout/SectionHeader";
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
          <SectionHeader title="Patients database">
            <Button component={Link} to={getNewDetailPath(PATIENTS_PATH)} variant="outlined" startIcon={<Add />}>
              Add new patient
            </Button>
          </SectionHeader>
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
