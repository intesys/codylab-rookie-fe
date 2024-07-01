import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetList from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath, getNewDetailPath } from "@lib/utils";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, FormEvent, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorFilterDTO } from "../../generated/axios";
import BreadcrumbEl from "../breadcrumb/BreadcrumbEl";
import Breadcrumb from "../breadcrumb/breadcrumb";
import "./index.scss";
import { Action, doctorsFilterReducer } from "./lib";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: React.Dispatch<Action>;
}

export const DoctorsFilterContext = React.createContext<IDoctorsFilterContext>({
  filter: {},
  dispatch: () => {},
});

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const navigate = useNavigate();
  const [doctors, loading] = useGetList(api.doctors.getListDoctor, filter);
  const [localFilter, setLocalFilter] = useState<DoctorFilterDTO>({});

  const handleNewClick = () => {
    navigate(getNewDetailPath(DOCTORS_PATH));
  };
  const handleDetailClick = (id: string) => {
    navigate(getDetailPath(DOCTORS_PATH, id));
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
      .filter(([key, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    dispatch({ type: "SET_FILTER", payload: filteredValues });
  };

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTORS DATABASE">
        <Button variant="outlined" onClick={handleNewClick}>
          <AddIcon /> ADD NEW DOCTOR
        </Button>
      </SectionHeader>

      <div className="box">
        <Box>
          <div className="doctorsHeader">
            <Typography variant="h6">FIND A DOCTOR</Typography>
            <Typography variant="body1" id="info">
              Insert the information of your colleagues
            </Typography>
          </div>
          <form className="doctorSearchForm" onSubmit={handleSearch}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  id="outlined-name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-surname"
                  name="surname"
                  label="Surname"
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-profession"
                  name="profession"
                  label="Profession/ Specialization"
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
      <div className="doctorsList">
        <Grid container spacing={2}>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            doctors.map((doctor) => (
              <Grid item xs={4} key={doctor.id}>
                <Card>
                  <CardContent>
                    <center>
                      <div onClick={() => handleDetailClick(String(doctor.id))}>
                        <Avatar
                          src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
                          sx={{ height: 100, width: 100 }}
                        />
                        <Typography variant="h6">
                          {doctor.name} <b>{doctor.surname}</b>
                        </Typography>
                        <Typography variant="body1">{doctor.profession}</Typography>
                        <Typography variant="body1" style={{ color: "red" }} className="contacts">
                          <PhoneIcon style={{ color: "red", marginRight: "10px" }} /> {doctor.phoneNumber}
                        </Typography>
                        <Typography variant="body1" className="contacts" style={{ color: "red" }}>
                          <MailOutlineIcon style={{ color: "red", marginRight: "10px" }} /> {doctor.email}
                        </Typography>
                        <Divider
                          style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }}
                        />
                        <Typography variant="body1">LATEST PATIENTS VISITED</Typography>
                        {doctor.latestPatients?.map((patient) => (
                          <div key={patient.id} className="latestPatients">
                            <Avatar src={generateAvatarImage(DetailType.PATIENT, patient.id)} />
                            <Typography variant="body1">{patient.name}</Typography>
                            <Typography variant="body1">{patient.surname}</Typography>
                          </div>
                        ))}
                      </div>
                    </center>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
