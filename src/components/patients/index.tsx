import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Dispatch, useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../config/api";
import { PATIENTS_PATH } from "../../config/paths";
import { PatientDTO, PatientFilterDTO } from "../../generated/axios";
import { getNewDetailPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../Layout/SectionHeader";
import FiltersForm from "./FiltersForm";
import PatientBox from "./PatientBox";
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
  const { enqueueSnackbar } = useSnackbar();

  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patientList, setPatientList] = useState<PatientDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPatientList(0, 100, "id,asc", filter)
      .then((response) => {
        setPatientList(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setPatientList, setLoading, filter]);

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl>Patients</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="Patients database">
        <Button component={Link} to={getNewDetailPath(PATIENTS_PATH)} variant="outlined" startIcon={<Add />}>
          Add new patient
        </Button>
      </SectionHeader>
      <FiltersForm />
      <Grid container mt={4} spacing={2}>
        {loading ? (
          <Grid direction="row" justifyContent="center" alignItems="center" item>
            <CircularProgress />
          </Grid>
        ) : (
          patientList.map((patient) => (
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
