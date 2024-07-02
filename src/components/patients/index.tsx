import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getNewDetailPath } from "@lib/utils";
import { Avatar, Box, Button, Card, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Action, patientsFilterReducer } from "./lib";

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

/* export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: () => {},
}); */

const patientListApi = api.patients.getListPatient;

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const [patients, loading] = useGetList(patientListApi, filter);
  const [pid, setPid] = useState("");
  const [opd, setOpd] = useState("");
  const [idp, setIdp] = useState("");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  /*   const [profession, setProfession] = useState("");
   */
  const handleSearch = () => {
    const newFilter: any = {};
    if (name) newFilter.name = name;
    if (surname) newFilter.surname = surname;
    /*  if (profession) newFilter.profession = profession; */
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  const handlePostClick = () => {
    navigate(getNewDetailPath(PATIENTS_PATH));
  };

  const handlePatientClick = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="PATIENTS DATABASE">
        <Button variant="outlined" onClick={handlePostClick}>
          + ADD NEW PATIENT
        </Button>
      </SectionHeader>
      <div id="patfilter">
        <Paper elevation={1}>
          <Box sx={{ px: 3 }}>
            <p id="doctor-line">
              <p id="finddoc">FIND A PATIENT</p>
              <sub> Insert the information of the colleagues</sub>
            </p>
          </Box>
          <Box component="section" sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  className="outlined-basic"
                  fullWidth
                  label="Patient ID (PID)"
                  variant="outlined"
                  size="small"
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className="outlined-basic"
                  fullWidth
                  label="Outpatient Number (OPD)"
                  variant="outlined"
                  size="small"
                  value={opd}
                  onChange={(e) => setOpd(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className="outlined-basic"
                  fullWidth
                  label="Inpatient Number (IDP)"
                  variant="outlined"
                  size="small"
                  value={idp}
                  onChange={(e) => setIdp(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" onClick={handleSearch}>
                  SEARCH
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
      <div className="contenitore-card">
        {patients.map((patient) => (
          <div className="card" /* key={patient.id} */ onClick={() => handlePatientClick(String(patient.id))}>
            <Card style={{ margin: "1rem", maxWidth: 350 }} variant="outlined">
              <p>
                <Typography variant="h6">
                  {patient.name}
                  <b> {patient.surname}</b>
                </Typography>
                <Typography variant="body1" className="contacts">
                  {patient.opd}
                </Typography>
                <Typography variant="body1" className="contacts">
                  {patient.idp}
                </Typography>
              </p>
              <center>
                <Avatar
                  className="avatar"
                  alt="icona"
                  sx={{ width: 88, height: 88 }}
                  src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                />
              </center>
            </Card>
          </div>
        ))}
      </div>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
