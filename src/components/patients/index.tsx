import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath, getNewDetailPath } from "@lib/utils";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Action, patientsFilterReducer } from "./lib";

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext = React.createContext<IPatientsFilterContext>({
  filter: {},
  dispatch: () => {},
});

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const navigate = useNavigate();
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const [patients, loading] = useGetList(api.patients.getListPatient, filter);

  const [pid, setPid] = useState("");
  const [opd, setOpd] = useState("");
  const [idp, setIdp] = useState("");

  const handleNewClick = () => {
    navigate(getNewDetailPath(PATIENTS_PATH));
  };

  const handleDetailClick = (id: string) => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  const handleSearch = () => {
    const newFilter = {};
    if (pid) newFilter.id = pid;
    if (opd) newFilter.opd = opd;
    if (idp) newFilter.idp = idp;
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title={<b>PATIENTS DATABASE</b>}>
        <Button variant="outlined" onClick={handleNewClick}>
          <AddIcon /> ADD NEW PATIENT
        </Button>
      </SectionHeader>

      <div className="box">
        <Box>
          <div className="patientHeader">
            <Typography variant="h6">
              <b>FIND A PATIENT</b>
            </Typography>
            <Typography variant="body1" id="info">
              Insert the information of the patient
            </Typography>
          </div>
          <form
            className="doctorsFormBody"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Patient ID (PID)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Outpatient Number (OPD)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={opd}
                  onChange={(e) => setOpd(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Inpatient Number (IDP)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={idp}
                  onChange={(e) => setIdp(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" fullWidth type="submit">
                  SEARCH <SearchIcon className="searchButtonIcon" />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
      <div className="patientList">
        <Grid container spacing={2}>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            patients.map((patient) => (
              <Grid item xs={4} key={patient.id}>
                <Card>
                  <CardContent>
                    <center>
                      <div onClick={() => handleDetailClick(String(patient.id))}>
                        <Typography variant="h6">
                          <b>{patient.name}</b> <b>{patient.surname}</b>
                        </Typography>
                        <Typography variant="body1" className="contacts">
                          PID: <b>{patient.id}</b> | OPD: <b>{patient.opd}</b> | IDP: <b>{patient.idp}</b>
                        </Typography>
                        <Avatar
                          src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                          sx={{ height: 100, width: 100 }}
                        />
                      </div>
                    </center>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
