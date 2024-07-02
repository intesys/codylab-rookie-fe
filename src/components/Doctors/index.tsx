// Doctors.js
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetList from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getNewDetailPath } from "@lib/utils";
import { MailOutline, Phone } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Card, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import "./index.scss";
import { doctorsFilterReducer } from "./lib";

const doctorListApi = api.doctors.getListDoctor;

export const DoctorsFilterContext = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Doctors = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const [doctors, loading] = useGetList(doctorListApi, filter);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");

  const handleSearch = () => {
    const newFilter = {};
    if (name) newFilter.name = name;
    if (surname) newFilter.surname = surname;
    if (profession) newFilter.profession = profession;
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  const handlePostClick = () => {
    navigate(getNewDetailPath(DOCTORS_PATH));
  };

  const handleDoctorClick = (id) => {
    navigate(`/doctors/${id}`);
  };

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTORS DATABASE">
        <Button variant="outlined" onClick={handlePostClick}>
          + ADD NEW DOCTOR
        </Button>
      </SectionHeader>
      <div id="docfilter">
        <Paper elevation={1}>
          <Box sx={{ px: 3 }}>
            <p id="doctor-line">
              <p id="finddoc">FIND A DOCTOR</p> <sub> Insert the information of the colleagues</sub>
            </p>
          </Box>
          <Box component="section" sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  className="outlined-basic"
                  fullWidth
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className="outlined-basic"
                  fullWidth
                  label="Surname"
                  variant="outlined"
                  size="small"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className="outlined-basic"
                  fullWidth
                  label="Profession/Specialization"
                  variant="outlined"
                  size="small"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" onClick={handleSearch}>
                  SEARCH <SearchIcon className="tastosearch" />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
      <div className="contenitore-card">
        {doctors.map((doctor) => (
          <div className="card" key={doctor.id} onClick={() => handleDoctorClick(doctor.id)}>
            <Card style={{ margin: "1rem", maxWidth: 350 }} variant="outlined">
              <center>
                <Avatar
                  className="avatar"
                  alt="icona"
                  sx={{ width: 88, height: 88 }}
                  src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
                />
              </center>
              <p>
                <Typography variant="h6">
                  {doctor.name}
                  <b> {doctor.surname}</b>
                </Typography>
              </p>
              <p>
                <Typography variant="body1">{doctor.profession}</Typography>
              </p>
              <p className="red-card">
                <Typography variant="body1" className="contacts">
                  <Phone /> {doctor.phoneNumber}
                </Typography>
              </p>
              <p className="red-card">
                <Typography variant="body1" className="contacts">
                  <MailOutline /> {doctor.email}
                </Typography>
              </p>
              <hr />
              <p>LAST PATIENTS VISITED</p>
              {doctor.latestPatients?.map((patient) => (
                <Box id="lastpatcard" display="flex" alignItems="center" key={patient.id}>
                  <Avatar
                    alt="icona"
                    sx={{ width: 35, height: 35 }}
                    src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                  />
                  <p className="nomi-pat">
                    <Typography variant="body1">{patient.name}</Typography>
                    <Typography variant="body1">{patient.surname}</Typography>
                  </p>
                </Box>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
