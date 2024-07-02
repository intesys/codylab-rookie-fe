import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { PATIENTS_PATH } from "@config/paths";
import { PatientFilterDTO } from "@generated/axios";
import { getNewDetailPath } from "@lib/utils";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Action, patientsFilterReducer } from "./lib";

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
  const [pid, setPid] = useState("");
  const [opd, setOpd] = useState("");
  const [idp, setIdp] = useState("");
  const navigate = useNavigate();

  const handleNewPatientClick = () => {
    navigate(getNewDetailPath(PATIENTS_PATH));
  };

  const handleSubmitClick = () => {};

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="PATIENT DATABASE">
        <Button variant="outlined" onClick={handleNewPatientClick}>
          <AddIcon className="addIcon" />
          ADD NEW PATIENT
        </Button>
      </SectionHeader>
      <div className="doctorsForm">
        <Paper className="paper">
          <div className="doctorsFormTitle">
            <Typography variant="h6">FIND A PATIENT</Typography>
            <Typography variant="body1" id="info">
              Insert the information of a patient
            </Typography>
          </div>
          <form className="doctorsFormBody" onSubmit={handleSubmitClick}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Patient ID (PID)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) => setPid(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Outpatient Number (OPD)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) => setOpd(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Inpatient Number (IDP)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) => setIdp(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" fullWidth type="submit">
                  SEARCH
                  <SearchIcon className="searchIcon" />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
      <Grid container spacing={2}></Grid>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
