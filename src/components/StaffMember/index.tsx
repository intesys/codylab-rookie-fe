import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MessageIcon from "@mui/icons-material/Message";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Button, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { STAFF_PATH } from "../../config/paths";
import { Doctor } from "../../generated/axios";
import { DetailType } from "../../lib/types";
import { generateAvatarImage, getPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import DetailHeader from "../Layout/DetailHeader";

const demoDoctor: Doctor = {
  id: 1,
  name: "Giogio",
  surname: "Vanni",
  phoneNumber: "1234567890",
  email: "giorgioVanni@ho.com",
  lastPatientsVisited: [
    {
      id: 1,
      name: "Mario",
      surname: "Rossi",
    },
    {
      id: 2,
      name: "Luigi",
      surname: "Verdi",
    },
  ],
};

const getDoctor = api.doctors.getDoctor;

const StaffMember: React.FC = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor>(demoDoctor);
  const [loading, setLoading] = useState(false);

  if (!id) return null;

  // useEffect(() => {
  //   setLoading(true);
  //   getDoctor(Number(id))
  //     .then((response) => {
  //       response.data = demoDoctor;
  //       setDoctor(response.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [setDoctor, setLoading, id]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(STAFF_PATH)}>Staff</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="flex-end">
            <Typography variant="h5" mr={3}>
              STAFF DETAILS
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Grid direction="row" justifyContent="center" alignItems="center" item>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <DetailHeader record={doctor} detailType={DetailType.PATIENT}>
                <Button variant="outlined" type="submit" startIcon={<MessageIcon />}>
                  Chat with doctor
                </Button>
              </DetailHeader>
              <Grid container>
                <Grid item xs={3}>
                  <Box sx={{ background: grey[800], padding: 4, color: "white" }}>
                    <Typography variant="subtitle1" textTransform="uppercase" component="h1" gutterBottom>
                      Contacts
                    </Typography>
                    <Divider color={grey[500]} />
                    <Typography component="h4" gutterBottom my={2}>
                      {doctor?.phoneNumber && (
                        <Stack direction="row" mb={1} spacing={2}>
                          <PhoneIcon color="primary" /> <span>{doctor.phoneNumber}</span>
                        </Stack>
                      )}
                      {doctor?.phoneNumber && (
                        <Stack direction="row" mb={1} spacing={2}>
                          <MailOutlineIcon color="primary" /> <span>{doctor.email}</span>
                        </Stack>
                      )}
                    </Typography>
                    <Typography mt={6} variant="subtitle1" textTransform="uppercase" component="h1" gutterBottom>
                      Last visited patients
                    </Typography>
                    <Divider color={grey[500]} />
                    <Grid container direction="row" my={2} spacing={2}>
                      {doctor?.lastPatientsVisited?.map((patient) => (
                        <Grid item xs={12} key={patient.id}>
                          <Stack direction="row" spacing={2}>
                            <Avatar
                              alt="Remy Sharp"
                              src={generateAvatarImage(200, DetailType.PATIENT, patient.id)}
                              sx={{ width: 35, height: 35 }}
                            />
                            <div>
                              {patient.name} <br /> {patient.surname}
                            </div>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box sx={{ padding: 2 }}>TODO</Box>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default StaffMember;
