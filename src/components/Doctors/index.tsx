import SectionHeader from "@components/layout/SectionHeader";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { Dispatch, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorFilterDTO } from "../../generated/axios";
import BreadcrumbEl from "../breadcrumb/BreadcrumbEl";
import Breadcrumb from "../breadcrumb/breadcrumb";
import DoctorCard from "./DoctorCards";
import "./index.scss";
import { Action, doctorsFilterReducer } from "./lib";

/*(Update tsconfig with alias and refactoring some part of application)*/

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const navigate = useNavigate();
  const doctors = [
    {
      id: 1,
      name: "Filippo Dolci",
      profession: "chirurgo",
      phoneNumber: "3490011222",
      email: "email.chenonghe1@gmail.com",
      patient: ["Enrico Costanzi", "Carlo Marchiori"],
    },
    {
      id: 2,
      name: "Alessandro Falezza",
      profession: "otorino laringoiatra",
      phoneNumber: "3490011222",
      email: "email.chenonghe2@gmail.com",
      latestPatients: ["Denny Moscon", "Enrico Costanzi", "Carlo Marchiori"],
    },
    {
      id: 3,
      name: "Marco Gialli",
      profession: "Medico di base",
      phoneNumber: "0230122222",
      email: "marco.gialli@ho.com",
      patients: ["Carlo Marchiori"],
    },
  ];

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTORS DATABASE">
        <Button variant="outlined">
          <AddIcon></AddIcon> ADD NEW DOCTOR
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
          <form className="doctorSearchForm">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField id="outlined-name" label="Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField id="outlined-surname" label="Surname" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField id="outlined-profession" label="Profession/ Specialization" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" fullWidth>
                  SEARCH <SearchIcon className="searchButtonIcon" />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
      <div className="box2">
        <Box mt={4} display="flex" flexWrap="wrap">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </Box>
      </div>
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
