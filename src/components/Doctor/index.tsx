import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getEditDetailPath, getPath } from "@lib/utils";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BreadcrumbEl from "../breadcrumb/BreadcrumbEl";
import Breadcrumb from "../breadcrumb/breadcrumb";
import "./index.scss";

const Doctor: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    navigate(getEditDetailPath(DOCTORS_PATH, id));
  };

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.doctors.getDoctor(Number(id)).then((response) => {
      setDoctor(response.data);
    });
    setLoading(false);
  }, [loading, id]);

  if (!doctor) {
    return <>Doctor not found</>;
  }

  return (
    <div className="doctor-details-container">
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTOR DETAILS"></SectionHeader>
      <div className="doctor-details-content">
        <Paper className="details-paper">
          <Grid container rowSpacing={2} columnSpacing={2} alignItems="center">
            <Grid item>
              <Avatar
                src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
                sx={{ height: 100, width: 100 }}
                className="avatar"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">
                {doctor.name} <b>{doctor.surname}</b>
                <EditIcon className="icons" style={{ color: "red" }} onClick={() => handleEditClick(id)} />
                <Typography variant="body1">{doctor.profession}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <div className="doctor-details-wrapper">
          <Box className="details-box">
            <Typography variant="h6" className="details-header">
              CONTACTS
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item">
              <PhoneIcon style={{ color: "red", marginRight: "10px" }} /> {doctor.phoneNumber}
            </Typography>
            <Typography variant="body1" className="contact-item">
              <MailOutlineIcon style={{ color: "red", marginRight: "10px" }} /> {doctor.email}
            </Typography>
            <Divider sx={{ my: 2, bgcolor: "#e0e0e0" }} />
            <Typography variant="h6" className="details-header">
              LAST VISITED PATIENTS
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            {doctor.latestPatients?.map((patient) => (
              <Box key={patient.id} className="latest-patient-item">
                <Avatar src={generateAvatarImage(DetailType.PATIENT, patient.id)} className="patient-avatar" />
                <Typography variant="body1">
                  {patient.name} {patient.surname}
                </Typography>
              </Box>
            ))}
          </Box>
          <div className="patients-section">
            <Paper className="detailPaper" style={{ marginLeft: "30px" }}>
              <Typography variant="h6" className="patientsheader">
                Patients
              </Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">PID</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">OPD</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">IDP</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">Name</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">Actions</Typography>
                </Grid>
                {doctor.latestPatients?.map((patient) => (
                  <React.Fragment key={patient.id}>
                    <Divider style={{ width: "100%", margin: "10px", backgroundColor: "#e0e0e0" }} />
                    <Grid item xs={3}>
                      <Typography variant="body1">{patient.id}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">{patient.opd}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">{patient.idp}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">{patient.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">
                        <ChevronRightIcon />
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
