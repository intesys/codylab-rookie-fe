import { Avatar, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENTS_PATH } from "../../../config/paths";
import { PatientDTO } from "../../../generated/axios";
import { DetailType } from "../../../lib/types";
import { generateAvatarImage, getDetailPath } from "../../../lib/utils";

type IProps = {
  props: {
    patient: PatientDTO;
  };
};

const PatientBox: FC<IProps> = ({ props }) => {
  const { patient } = props;

  const lastVisit = useMemo(() => patient.patientRecords?.[0], [patient]);

  return (
    <Card>
      <CardActionArea sx={{ padding: 2 }} component={Link} to={getDetailPath(PATIENTS_PATH, patient.id)}>
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
              PID: <strong>{patient.id}</strong> | OPD: <strong>{patient.opd}</strong> | IDP:
              <strong> {patient.idp}</strong>
            </Grid>
            <Grid item xs={12}>
              <Avatar
                alt={`${patient.name} ${patient.surname}`}
                src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PatientBox;
