import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath } from "@lib/utils";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Card, CardActionArea, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type IProps = {
  props: {
    doctor: DoctorDTO;
  };
};

const DoctorBox: React.FC<IProps> = ({ props }) => {
  const { doctor } = props;
  return (
    <Card data-cy="doctor-item">
      <CardActionArea sx={{ padding: 2 }} component={Link} to={getDetailPath(DOCTORS_PATH, doctor.id)}>
        <CardContent>
          <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center" spacing={2}>
            <Grid item xs={12}>
              <Avatar
                alt={`${doctor.name} ${doctor.surname}`}
                src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h4" variant="h5" data-cy="doctor-name">
                {doctor.name} <strong>{doctor.surname}</strong>
              </Typography>
              <Typography component="h5" variant="subtitle1" gutterBottom>
                {doctor.profession}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h4" gutterBottom color="primary">
                {doctor.phoneNumber && (
                  <Stack direction="row" justifyContent="center" alignItems="center" mb={1} spacing={2}>
                    <PhoneIcon /> <span>{doctor.phoneNumber}</span>
                  </Stack>
                )}
                {doctor.email && (
                  <Stack direction="row" justifyContent="center" alignItems="center" mb={1} spacing={2}>
                    <MailOutlineIcon /> <span>{doctor.email}</span>
                  </Stack>
                )}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography component="h4" textTransform="uppercase">
                Last patients visited
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
                      <div>
                        {patient.name} <br /> {patient.surname}
                      </div>
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
