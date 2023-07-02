import { Card, CardActionArea, CardContent, Typography, Avatar } from "@mui/material";
import React from "react";
import { PatientDTO } from "../../../generated/axios";
import { DetailType } from "../../../lib/types";
import { generateAvatarImage } from "../../../lib/utils";

interface IProps {
    props: {
      patient: PatientDTO;
    };
  }
  
  const PatientBox: React.FC<IProps> = ({ props }) => {
    const { patient } = props;
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography textAlign="center">
              <strong>
                {patient.name} {patient.surname}
              </strong>
            </Typography>
            <Typography textAlign="center">
              PID: <strong>{patient.id}</strong> | OPD: <strong>{patient.opd}</strong> | IDP:
              <strong> {patient.idp}</strong>
            </Typography>
            <Typography textAlign="center">
              <Avatar
                alt={`${patient.name} ${patient.surname}`}
                src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  
  export default PatientBox;
  