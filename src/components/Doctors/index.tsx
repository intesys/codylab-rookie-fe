import { Box, Button, TextField } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { api } from "../../config/api";
import { DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "./lib";

import { DOCTORS_PATH, PATIENTS_PATH } from "@config/paths";
import useGetList from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath } from "@lib/utils";
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

  const handleDoctorClick = (id: number) => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  };

  const handlAddNewDoctorClick = () => {
    navigate(`/doctors/new`);
  };

  const handlePatientClick = (id: number) => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  const handleSearch = () => {
    const newFilter = {} as DoctorFilterDTO;
    if (name) newFilter.name = name;
    if (surname) newFilter.surname = surname;
    if (profession) newFilter.profession = profession;
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <div className="header">
        <h3 className="titolo">DOCTORS DATABASE</h3>
        <Button variant="outlined" onClick={() => handlAddNewDoctorClick()}>
          + ADD NEW DOCTOR
        </Button>
      </div>
      <div className="form">
        <div className="form-title">
          <h3 className="title_form-title">FIND A DOCTORS</h3>
          <p className="subtitle_form-title">Insert the information of your colleagues</p>
        </div>
        <Box
          sx={{
            columnGap: 2,
            display: "grid",
            gridTemplateColumns: "repeat(13, 1fr)",
            gridTemplateAreas: `"name name name surname surname surname profession profession profession profession profession search search search search search"`,
          }}
        >
          <TextField
            sx={{ gridArea: "name" }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ gridArea: "surname" }}
            id="outlined-basic"
            label="Surname"
            variant="outlined"
            size="small"
            onChange={(e) => setSurname(e.target.value)}
          />

          <TextField
            sx={{ gridRow: "1", gridColumn: "span 2", gridArea: "profession" }}
            id="outlined-basic"
            label="Profession / Specializzation"
            variant="outlined"
            size="small"
            onChange={(e) => setProfession(e.target.value)}
          />
          <Button sx={{ gridArea: "search" }} variant="outlined" onClick={handleSearch}>
            Search
            <img width="22" height="22" src="https://img.icons8.com/sf-regular/48/FA5252/search.png" alt="search--v1" />
          </Button>
        </Box>
      </div>
      <br />
      <br />
      <Box sx={{ columnGap: 3, rowGap: 4, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {doctors.map((doctor) => (
          <div className="box-doctor" key={doctor.id}>
            <div className="avatar" onClick={() => handleDoctorClick(doctor.id ?? 0)}>
              <img src={generateAvatarImage(DetailType.DOCTOR, doctor.id)} alt="" />
            </div>
            <div className="box-info">
              <p className="name" onClick={() => handleDoctorClick(doctor.id ?? 0)}>
                {doctor.name} <strong>{doctor.surname}</strong>
              </p>
              <p className="profession" onClick={() => handleDoctorClick(doctor.id ?? 0)}>
                {doctor.profession}
              </p>
              <p className="phone" onClick={() => handleDoctorClick(doctor.id ?? 0)}>
                <img
                  className="img-phone"
                  src="https://img.icons8.com/ios-filled/50/FA5252/phone.png"
                  alt="phone--v1"
                />
                {doctor.phoneNumber}
              </p>
              <p className="email" onClick={() => handleDoctorClick(doctor.id ?? 0)}>
                <img
                  className="img-email"
                  src="https://img.icons8.com/material-outlined/24/FA5252/new-post.png"
                  alt="new-post"
                />
                {doctor.email}
              </p>
              <div className="border"></div>
              <p className="last-patient">LAST PATIENT VISITED</p>
              <section className="box-list_last-patient">
                {doctor.latestPatients?.map((patient) => (
                  <div className="post" key={patient.id}>
                    <div
                      className="box-last-patient"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handlePatientClick(Number(patient.id))}
                    >
                      <div className="last-patient_avatar">
                        <img src={generateAvatarImage(DetailType.PATIENT, patient.id)} alt="" />
                      </div>
                      <p>
                        {patient.name} {patient.surname}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        ))}
      </Box>
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
