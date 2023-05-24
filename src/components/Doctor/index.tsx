import { Edit } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { DOCTORS_PATH } from "../../config/paths";
import { DoctorDTO } from "../../generated/axios";
import useGetDetail from "../../hooks/useGetDetail";
import { DetailType } from "../../lib/types";
import { generateAvatarImage, getEditDetailPath, getPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import DetailHeader from "../Layout/DetailHeader";
import PatientsTable from "./PatientsTable";

const emptyRecord = {};
const getDoctor = api.doctors.getDoctor;

const Doctor: React.FC = () => {
  const { id } = useParams();
  const [doctor, loading] = useGetDetail(getDoctor, emptyRecord as DoctorDTO, Number(id));

  if (!id) return null;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="flex-end">
            <Typography variant="h5" mr={3} textTransform="uppercase">
              Doctor details
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
              <DetailHeader
                record={doctor}
                detailType={DetailType.DOCTOR}
                subTitle={doctor?.profession}
                edit={
                  <IconButton component={Link} to={getEditDetailPath(DOCTORS_PATH, doctor.id)}>
                    <Edit color="primary" />
                  </IconButton>
                }
              />
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
                      {doctor?.latestPatients?.map((patient) => (
                        <Grid item xs={12} key={patient.id}>
                          <Stack direction="row" spacing={2}>
                            <Avatar
                              alt={patient.name}
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
                  </Box>
                </Grid>
                <Grid item xs={9} p={6}>
                  <PatientsTable doctor={doctor} />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Doctor;
