import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getEditDetailPath, getPath } from "@lib/utils";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Avatar, Box, Button, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { red } from "@mui/material/colors";
import "./index.scss";

import { DoctorDTO } from "@generated/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";

const Doctor: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  const handlDeleteDoctorClick = useCallback(() => {
    api.doctors.deleteDoctor(Number(id)).catch((error) => {
      enqueueSnackbar(`Errore: si è verificato un problema`, { variant: "error" });
    });
    enqueueSnackbar(`Success: Dottore ELIMINATO`, { variant: "success" });
    navigate(`/doctors`);
  }, [id]);

  const handlEditDoctorClick = useCallback(() => {
    navigate(getEditDetailPath(DOCTORS_PATH, id));
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.doctors.getDoctor(Number(id)).then((response) => {
      setDoctor(response.data);
    });
    if (!doctor) {
      return;
    }

    doctor?.latestPatients?.reverse();

    setLoading(false);
  }, [loading, id]);

  if (!doctor) {
    return <>Patient not found</>;
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>

      {/* TITOLO */}
      <div className="header">
        <h3 className="titolo">DOCTORS DATABASE</h3>
        <Button variant="outlined" onClick={() => handlDeleteDoctorClick()}>
          <DeleteIcon></DeleteIcon>
          DELETE
        </Button>
      </div>
      {/* AVATAR, NOME, COGNOME,  PROFESSIONE*/}
      <div className="doctor-details-top">
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={doctor.name}
          src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
        />
        <div className="doctor-text-info">
          <p className="doctor-name">
            {doctor.name} <strong>{doctor.surname} </strong>
            <ModeEditOutlineIcon
              sx={{ color: red[500] }}
              fontSize="small"
              onClick={() => handlEditDoctorClick()}
            ></ModeEditOutlineIcon>
          </p>
          <p className="doctor-profession">{doctor.profession}</p>
        </div>
      </div>
      <div className="bottom-information">
        {/* CONTATTI, LAST VISITED PATIENTS*/}
        <div className="doctor-details-left-bottom">
          <h3 className="doctor-details-contacts">CONTACTS</h3>
          <div className="border"></div>

          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <LocalPhoneIcon className="doctor-details-phone-number-icon" sx={{ color: red[500] }}></LocalPhoneIcon>
            <p className="doctor-details-phone-number-text">{doctor.phoneNumber}</p>
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <MailOutlineIcon className="doctor-details-email-icon" sx={{ color: red[500] }}></MailOutlineIcon>
            <p className="doctor-details-email-text">{doctor.email}</p>
          </Grid>
          <br />

          <h3 className="doctor-details-contacts">LAST VISITED PATIENTS</h3>
          <div className="border"></div>

          <br />
          <div>
            {doctor.latestPatients && doctor.latestPatients.length > 0 && doctor.latestPatients[0].name && (
              <div className="box-last-patient">
                <div>
                  <Avatar
                    alt="Remy Sharp"
                    src={generateAvatarImage(DetailType.PATIENT, doctor.latestPatients[0].id)}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <p className="doctor-details-patient-name-surname">
                  {doctor.latestPatients[0].name} {doctor.latestPatients[0].surname}
                </p>
              </div>
            )}
            {doctor.latestPatients && doctor.latestPatients.length > 0 && doctor.latestPatients[1].name && (
              <div className="box-last-patient">
                <div>
                  <Avatar
                    alt="Remy Sharp"
                    src={generateAvatarImage(DetailType.PATIENT, doctor.latestPatients[1].id)}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <p className="doctor-details-patient-name-surname">
                  {doctor.latestPatients[1].name} {doctor.latestPatients[1].surname}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Patients Informations*/}
        <div className="patient-details-right-bottom">
          <h3 className="patient-details-title">Patients</h3>
          <div className="border-potente"></div>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(50, 1fr)",
            }}
          >
            <Grid sx={{ gridRow: "1", gridColumn: "span 1" }}>
              <h4 dir="rtl">PID</h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 10" }}>
              <h4 dir="rtl">OPD</h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 9" }}>
              <h4 dir="rtl">IDP</h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 9" }}>
              <h4 dir="rtl">Name</h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 11" }}>
              <h4 dir="rtl">Surname</h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 10" }}>
              <h4 dir="rtl">Actions</h4>
            </Grid>
          </Box>
          {doctor.latestPatients?.map((patient) => (
            <div key={patient.id}>
              <div className="border"></div>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(50, 1fr)",
                  color: "grey",
                }}
              >
                <Grid sx={{ gridRow: "1", gridColumn: "span 1" }}>
                  <h4 dir="rtl">{patient.id}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 10" }}>
                  <h4 dir="rtl">{patient.opd}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 9" }}>
                  <h4 dir="rtl">{patient.idp}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 9" }}>
                  <h4 dir="rtl">{patient.name}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 11" }}>
                  <h4 dir="rtl">{patient.surname}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 10" }}>
                  <h4 dir="rtl">
                    <ChevronRightIcon fontSize="large"></ChevronRightIcon>
                  </h4>
                </Grid>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
