import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import "./index.scss";

interface DoctorCardProps extends DoctorDTO {}

const DoctorCard: React.FC<DoctorCardProps> = ({ id, name, profession, phoneNumber, email, latestPatients }) => {
  const [firstName, ...lastNameParts] = name.split(" ");
  const lastName = lastNameParts.join(" ");
  return (
    <Card style={{ margin: "1rem", width: 350 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={generateAvatarImage(DetailType.DOCTOR, id)}
            style={{ width: 85, height: 85, marginBottom: "1rem" }}
          />
          <Box ml={2}>
            <Typography variant="h6" textAlign="center">
              {firstName} <span style={{ fontWeight: "bold" }}>{lastName}</span>
            </Typography>
            <Typography style={{ textAlign: "center" }} color="textSecondary">
              {profession}
            </Typography>
          </Box>
        </Box>
        <List>
          <ListItem style={{ justifyContent: "center" }}>
            <ListItemIcon>
              <PhoneIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary={phoneNumber} primaryTypographyProps={{ color: "red", alignItems: "center" }} />
          </ListItem>
          <ListItem style={{ justifyContent: "center" }}>
            <ListItemIcon>
              <MailOutlineIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary={email} primaryTypographyProps={{ color: "red", textAlign: "center" }} />
          </ListItem>
        </List>
        <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
        <Box mt={2}>
          <Typography style={{ textAlign: "center" }} variant="body2">
            LAST PATIENTS VISITED
          </Typography>
          {latestPatients?.map((patient, index) => (
            <Typography key={index} variant="body2" color="textSecondary">
              {patient.name}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
