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
import React, { ChangeEvent, Dispatch, FormEvent, useMemo, useReducer, useState } from "react";
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
  const [localFilter, setLocalFilter] = useState<PatientFilterDTO>({});

  const handleNewClick = () => {
    navigate(getNewDetailPath(PATIENTS_PATH));
  };

  const handleDetailClick = (id: string) => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const filteredValues = Object.entries(localFilter)
      .filter(([_, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    dispatch({ type: "SET_FILTER", payload: filteredValues });
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
          <form className="patientSearchForm" onSubmit={handleSearch}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  id="outlined-id"
                  name="PID"
                  label="Patient ID (PID)"
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-surname"
                  name="OPD"
                  label="Outpatient Number (OPD)"
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-profession"
                  name="IDP"
                  label="Inpatient Number (IDP)"
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
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
