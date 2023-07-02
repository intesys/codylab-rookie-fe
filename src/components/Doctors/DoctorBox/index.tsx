import { Card, CardActionArea, CardContent, Typography, Avatar } from "@mui/material";
import React from "react";
import { DoctorDTO } from "../../../generated/axios";
import { DetailType } from "../../../lib/types";
import { generateAvatarImage } from "../../../lib/utils";

interface IProps {
    props: {
      doctor: DoctorDTO;
    };
  }
  
  const DoctorBox: React.FC<IProps> = ({ props }) => {
    const { doctor } = props;
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography textAlign="center">
              <strong>
                {doctor.name} {doctor.surname}
              </strong>
            </Typography>
            <Typography textAlign="center">
              PID: <strong>{doctor.id}</strong>
            </Typography>
            <Typography textAlign="center">
              <Avatar
                alt={`${doctor.name} ${doctor.surname}`}
                src={generateAvatarImage(DetailType.PATIENT, doctor.id)}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  
  export default DoctorBox;
  