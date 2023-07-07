import { Avatar, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
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

const PatientBox: React.FC<IProps> = ({ props }) => {
  const { patient } = props;

  return (
    <Card>
      <CardActionArea
        component={Link}
        to={getDetailPath(PATIENTS_PATH, patient.id)}
        sx={{
          border: "1px solid #ccc",
          borderBottom: "3px solid #ccc",
          transition: "background-color 0.3s",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#f1f1f1",
          },
          borderRadius: "4px",
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={0.1}
            sx={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Nome */}
            <Grid item xs={12}>
              <Typography variant="h5" component="div" align="center">
                {patient.name} {patient.surname}
              </Typography>
            </Grid>

            {/* PID, OPID, IDP */}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                PID: <strong>{patient.id}</strong> | OPD: <strong>{patient.opd}</strong> | IDP:{" "}
                <strong>{patient.idp}</strong>
              </Typography>
            </Grid>

            {/* Avatar */}
            <Grid item xs={12}>
              <Avatar
                alt={`${patient.name} ${patient.surname}`}
                src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                sx={{ width: 95, height: 95, marginTop: "16px" }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PatientBox;
