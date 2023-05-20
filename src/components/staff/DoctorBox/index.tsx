import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MessageIcon from "@mui/icons-material/Message";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PATH, STAFF_PATH } from "../../../config/paths";
import { Doctor } from "../../../generated/axios";
import { generateAvatarImage, getDetailPath } from "../../../lib/utils";

type IProps = {
  props: {
    doctor: Doctor;
  };
};

const DoctorBox: FC<IProps> = ({ props }) => {
  const { doctor } = props;
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader action={<MessageIcon color="primary" />} />
      <CardActionArea sx={{ padding: 2 }} onClick={() => navigate(getDetailPath(HOME_PATH + STAFF_PATH, doctor.id))}>
        <CardContent>
          <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center" spacing={2}>
            <Grid item xs={12}>
              <Avatar
                alt={`${doctor.name} ${doctor.surname}`}
                src={generateAvatarImage(200, "d", doctor.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h4" variant="h5" gutterBottom>
                {doctor.name} <strong>{doctor.surname}</strong>
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
                {doctor.lastPatientsVisited?.map((patient) => (
                  <Grid item xs={6} key={patient.id}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        src={generateAvatarImage(200, "p", patient.id)}
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
