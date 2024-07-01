import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getPath } from "@lib/utils";
import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
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
              <Typography variant="body1">
                <CallIcon className="icons" />
                {doctor.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <EmailIcon className="icons" />
                {doctor.email}
              </Typography>
              {doctor.latestPatients?.map((patient) => (
                <div>
                  <Typography variant="body1">LATEST PATIENTS VISITED</Typography>
                  <div className="latestPatients">
                    <Avatar src={generateAvatarImage(DetailType.PATIENT, patient.id)} />
                    <Typography variant="body1">{patient.name}</Typography>
                    <Typography variant="body1">{patient.surname}</Typography>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorDetail;
