import { Avatar, Card, CardActionArea, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { DOCTORS_PATH } from "../../../config/paths";
import { DoctorDTO } from "../../../generated/axios";
import { DetailType } from "../../../lib/types";
import { generateAvatarImage, getDetailPath } from "../../../lib/utils";

type IProps = {
  props: {
    doctor: DoctorDTO;
  };
};

const DoctorBox: FC<IProps> = ({ props }) => {
  const { doctor } = props;
  return (
    <Card
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        padding: "16px",
        border: "1px solid #ccc",
        borderBottom: "3px solid #ccc",
      }}
    >
      <CardActionArea sx={{ padding: 2 }} component={Link} to={getDetailPath(DOCTORS_PATH, doctor.id)}>
        <CardContent>
          <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center" spacing={2}>
            {/* Avatar */}
            <Grid item xs={12}>
              <Avatar
                alt={`${doctor.name} ${doctor.surname}`}
                src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>

            {/* Nome e cognome*/}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                {doctor.name} <strong>{doctor.surname}</strong>
              </Typography>
              <Typography component="h5" variant="subtitle1" gutterBottom>
                {doctor.profession}
              </Typography>
            </Grid>

            {/* Num di telefono ed email */}
            <Grid item xs={12}>
              <Typography component="h4" gutterBottom color="primary">
                {doctor.phoneNumber}
              </Typography>
              <Typography component="h4" gutterBottom color="primary">
                {doctor.email}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 1 }} />

          {/* Ultimi pazienti visitati */}
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography component="h4" textTransform="uppercase">
                Last patients
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={2}>
                {doctor.latestPatients?.map((patient) => (
                  <Grid item xs={6} key={patient.id}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                        sx={{ width: 35, height: 35 }}
                      />
                      <Grid>
                        {patient.name} <br /> {patient.surname}
                      </Grid>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DoctorBox; 