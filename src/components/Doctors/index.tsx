<<<<<<< HEAD
import { Avatar, Card, CardContent, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "./lib";
=======
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import DoctorBox from "@components/Doctors/DoctorBox";
import FiltersForm from "@components/Doctors/FiltersForm";
import { Action, doctorsFilterReducer } from "@components/Doctors/lib";
import SectionHeader from "@components/Layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getNewDetailPath } from "@lib/utils";
import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { Link } from "react-router-dom";
>>>>>>> 89e314f (Update tsconfig with alias and refactoring som part of application)
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetList from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath, getNewDetailPath } from "@lib/utils";
import AddIcon from '@mui/icons-material/Add';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.scss";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const doctorListApi = api.doctors.getListDoctor;

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const [doctors, loading] = useGetList(doctorListApi, filter);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  
  const navigate = useNavigate();
  
  const handleNewDoctorClick = () =>{
    navigate(getNewDetailPath(DOCTORS_PATH));
  }

  const handleDoctorDetailClick = (id: string) => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  }

  const handleSubmitClick = () => {
    const newFilter = {};
    if (name) newFilter.name = name;
    if (surname) newFilter.surname = surname;
    if (name) newFilter.profession = profession;
    dispatch({ type:"SET_FILTER", payload:newFilter});
  
  }



  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      {/* Doctors filter form */}
      {/* Doctors list */}
      <SectionHeader title="DOCTOR DATABASE">
      <Button variant="outlined" onClick={handleNewDoctorClick}> 
        <AddIcon className="addIcon"/>ADD NEW DOCTOR
      </Button>
      </SectionHeader>

    <div className="doctorsForm">
      <Paper  className="paper">
        <div className="doctorsFormTitle">
          <Typography variant="h6">FIND DOCTORS</Typography>
          <Typography variant="body1" id="info">Insert the information of your colleagues</Typography>
          </div>
          <form className="doctorsFormBody" onSubmit={handleSubmitClick}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField label="Name" variant="outlined" fullWidth size="small" onChange={(e) => setName(e.target.value)}/>
              </Grid>
              <Grid item xs={3}>
                <TextField label="Surname" variant="outlined" fullWidth size="small" onChange={(e) => setSurname(e.target.value)}/>
              </Grid>
              <Grid item xs={4}>
                <TextField label="Profession/ Specialization" variant="outlined" fullWidth size="small" onChange={(e) => setProfession(e.target.value)}/>
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" fullWidth type="submit">
                  SEARCH
                <SearchIcon className="searchIcon"/>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        </div>
        <div className="doctorsList">
          <Grid container spacing={2}>
            {doctors.map((doctor) => (
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <center>
                    <div onClick={() => handleDoctorDetailClick(String(doctor.id))}>
                      <Avatar src={generateAvatarImage(DetailType.DOCTOR, doctor.id)} sx={{ height: 100, width: 100 }} />
                      <Typography variant="h6">
                        {doctor.name} <b>{doctor.surname}</b>  
                        </Typography >
                      <Typography variant="body1"></Typography>
                      {doctor.profession}
                      <br />
                      </div>   
                      <Typography variant="body1" className="contacts">
                        <CallIcon /> {doctor.phoneNumber}
                      </Typography>
                      <Typography variant="body1" className="contacts">
                        <EmailIcon /> {doctor.email}
                        </Typography>
                        <Divider
                          style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }}
                        />
                        {doctor.latestPatients?.map((patient) => (
                            <>
                          <Typography variant="body1">LATEST PATIENTS VISITED</Typography>
                          <div className="latestPatients">
                          <Avatar src={generateAvatarImage(DetailType.PATIENT, patient.id)}/>
                          <Typography variant="body1">{patient.name}<br/>{patient.surname}</Typography>
                          </div>
                          </>
                        ))}
                    </center>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
