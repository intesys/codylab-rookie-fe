import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PhoneIcon from "@mui/icons-material/Phone";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DATE_FORMAT } from "../../../config/date";
import { HOME_PATH, PATIENTS_PATH } from "../../../config/paths";
import { Patient as PatientType } from "../../../generated/axios";
import { generateAvatarImage, getDetailPath } from "../../../lib/utils";

type IProps = {
  props: {
    patient: PatientType;
  };
};

const PatientBox: FC<IProps> = ({ props }) => {
  const { patient } = props;
  const navigate = useNavigate();

  const lastVisit = useMemo(() => patient.patientRecords?.[0], [patient]));

  return (
    <Card>
      <CardActionArea
        sx={{ padding: 2 }}
        onClick={() => navigate(getDetailPath(HOME_PATH + PATIENTS_PATH, patient.id))}
      >
        <CardContent>
          <Grid container direction="row" justifyContent="center" alignItems="center" textAlign="center" spacing={2}>
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                <strong>
                  {patient.name} {patient.surname}
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              PID: <strong>{patient.id}</strong> - OPD: <strong>{patient.opd}</strong>
            </Grid>
            <Grid item xs={12}>
              <Avatar
                alt={`${patient.name} ${patient.surname}`}
                src={generateAvatarImage(200, "p", patient.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <List sx={{ width: "100%" }} dense>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Last admission:"
                    secondary={
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {moment(patient.lastAdmission).format(DATE_FORMAT)}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <MedicalInformationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reason of visit:"
                    secondary={
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {lastVisit?.reasonVisit}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <VaccinesIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Treatment made:"
                    secondary={
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {lastVisit?.treatmentMade}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h4" gutterBottom color="primary">
                {patient.phoneNumber && (
                  <Stack direction="row" justifyContent="center" alignItems="center" mb={1} spacing={2}>
                    <PhoneIcon /> <span>{patient.phoneNumber}</span>
                  </Stack>
                )}
                {patient.phoneNumber && (
                  <Stack direction="row" justifyContent="center" alignItems="center" mb={1} spacing={2}>
                    <MailOutlineIcon /> <span>{patient.email}</span>
                  </Stack>
                )}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h4" textTransform="uppercase">
                Last doctor who visit the patient
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  src={generateAvatarImage(200, "d", lastVisit?.id)}
                  sx={{ width: 60, height: 60 }}
                />
                <Stack direction="column" >
                  <Typography color="primary" variant="h6" mb={3}>
                    {lastVisit?.name} {lastVisit?.surname}
                  </Typography>
                  <Typography component="h4" gutterBottom color="primary">
                    {lastVisit?.phoneNumber && (
                      <Stack direction="row" mb={1} spacing={2}>
                        <PhoneIcon /> <span>{lastVisit?.phoneNumber}</span>
                      </Stack>
                    )}
                    {lastVisit?.email && (
                      <Stack direction="row" mb={1} spacing={2}>
                        <MailOutlineIcon /> <span>{lastVisit?.email}</span>
                      </Stack>
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PatientBox;
