import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getPath } from "@lib/utils";
import CallIcon from "@mui/icons-material/Call";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";

const DoctorDetail: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTOR DETAILS" />
      <Paper>
        <Grid container rowSpacing={2} columnSpacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
              sx={{ height: 100, width: 100 }}
              className="avatar"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5">
              {doctor.name} <b>{doctor.surname}</b> <EditIcon className="icons" />
              <br />
              <Typography variant="body1">{doctor.profession}</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={3}>
          <Card>
            <CardContent className="card">
              <Typography variant="body1">CONTACTS</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">
                <CallIcon className="icons" />
                {doctor.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <EmailIcon className="icons" />
                {doctor.email}
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              {doctor.latestPatients?.map((patient) => (
                <>
                  <Typography variant="body1">LATEST PATIENTS VISITED</Typography>
                  <div className="latestPatients">
                    <Avatar src={generateAvatarImage(DetailType.PATIENT, patient.id)} className="patientAvatar" />
                    <Typography variant="body1">
                      {patient.name}
                      <br /> {patient.surname}
                    </Typography>
                  </div>
                </>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Paper className="detailPaper">
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
                <>
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
                </>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorDetail;
