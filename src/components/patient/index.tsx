import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PhoneIcon from "@mui/icons-material/Phone";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { DATE_FORMAT } from "../../config/date";
import { Patient, PatientBloodGroupEnum } from "../../generated/axios";
import { DetailType } from "../../lib/types";
import { generateAvatarImage, getBloodType } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import DetailHeader from "../Layout/DetailHeader";
import SectionHeader from "../Layout/SectionHeader";
import RecordTable from "./RecordsTable";

const demoPatient: Patient = {
  id: 1,
  name: "Giogio",
  surname: "Vanni",
  email: "giorgioVanni@ho.com",
  address: "Via Roma 1 - 00100 Roma",
  opd: 2032,
  bloodGroup: PatientBloodGroupEnum.APlus,
  notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  chronicPatient: false,
  lastAdmission: new Date().toISOString(),
  patientRecords: [
    {
      id: 1,
      date: new Date().toISOString(),
      typeVisit: "Examination",
      reasonVisit: "Stomachache",
      treatmentMade: "Gave him some pills", // DEVE DIVENTARE UNA STRINGA
      // deve essere aggiunte tutte le info del medico
      doctor: {
        id: 1,
        name: "Giogio",
        surname: "Vanni",
        phoneNumber: "1234567890",
        email: "giorgioVanni@ho.com",
      },
    },
    {
      id: 2,
      date: new Date().toISOString(),
      typeVisit: "Visit",
      reasonVisit: "Stomachache",
      treatmentMade: "Gave him some pills", // DEVE DIVENTARE UNA STRINGA
      // deve essere aggiunte tutte le info del medico
      doctor: {
        id: 1,
        name: "Giogio",
        surname: "Vanni",
        phoneNumber: "1234567890",
        email: "giorgioVanni@ho.com",
      },
    },
    {
      id: 3,
      date: new Date().toISOString(),
      typeVisit: "Admission",
      reasonVisit: "Stomachache",
      treatmentMade: "Gave him some pills", // DEVE DIVENTARE UNA STRINGA
      // deve essere aggiunte tutte le info del medico
      doctor: {
        id: 2,
        name: "Giogio",
        surname: "Vanni",
        phoneNumber: "1234567890",
        email: "giorgioVanni@ho.com",
      },
    },
  ],
};

const getPatient = api.patients.getPatient;
const deletePatient = api.patients.deletePatient;

const StaffMember: React.FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>(demoPatient);
  const [loading, setLoading] = useState(false);

  const lastVisit = useMemo(() => patient.patientRecords?.[0], [patient]);

  if (!id) return null;

  // useEffect(() => {
  //   setLoading(true);
  //   getPatient(Number(id))
  //     .then((response) => {
  //       response.data = demoPatient;
  //       setPatient(response.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [setPatient, setLoading, id]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to="/staff">Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient?.name} {patient?.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="Patient details">
            <Button variant="outlined" type="submit" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </SectionHeader>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Grid direction="row" justifyContent="center" alignItems="center" item>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <DetailHeader
                record={patient}
                subTitle={patient.address}
                detailType={DetailType.DOCTOR}
                edit={
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                }
              />
              <Grid container>
                <Grid item xs={3}>
                  <Box sx={{ background: grey[800], padding: 4, color: "white" }}>
                    <Typography variant="subtitle1" textTransform="uppercase" component="h1" gutterBottom>
                      Health information
                    </Typography>
                    <Divider color={grey[500]} />
                    <Stack my={2}>
                      <Typography textTransform="uppercase" color={grey[500]}>
                        Patient ID
                      </Typography>
                      <Typography variant="h3">{patient?.id}</Typography>
                    </Stack>
                    <Stack my={2}>
                      <Typography textTransform="uppercase" color={grey[500]}>
                        OPD
                      </Typography>
                      <Typography variant="h3">{patient?.opd}</Typography>
                    </Stack>
                    <Stack my={2}>
                      <Typography textTransform="uppercase" color={grey[500]}>
                        Blood group
                      </Typography>
                      <Typography variant="h3">{getBloodType(patient?.bloodGroup)}</Typography>
                    </Stack>
                    <Divider color={grey[500]} />
                    <Typography component="p" my={2}>
                      <strong color={grey[500]}>Notes</strong> <br />
                      {patient?.notes}
                    </Typography>
                    <Divider color={grey[500]} />
                    <Stack direction="row" my={2}>
                      <Typography textTransform="uppercase">
                        Chronic patient: {patient.chronicPatient ? "YES" : "NO"}
                      </Typography>
                    </Stack>
                    <Divider color={grey[500]} />
                    <List sx={{ width: "100%", my: 2 }} dense>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <AccessTimeIcon sx={{ fill: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Last admission:"
                          secondary={
                            <Typography sx={{ display: "inline" }} component="span" variant="body2">
                              {moment(patient.lastAdmission).format(DATE_FORMAT)}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <MedicalInformationIcon sx={{ fill: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Reason of visit:"
                          secondary={
                            <Typography sx={{ display: "inline" }} component="span" variant="body2">
                              {lastVisit?.reasonVisit}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <VaccinesIcon sx={{ fill: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Treatment made:"
                          secondary={
                            <Typography sx={{ display: "inline" }} component="span" variant="body2">
                              {lastVisit?.treatmentMade}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                    <Divider color={grey[500]} />
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12}>
                        <Typography component="h4" textTransform="uppercase">
                          Last doctor who visit the patient
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            alt="Remy Sharp"
                            src={generateAvatarImage(200, DetailType.DOCTOR, lastVisit?.doctor?.id)}
                            sx={{ width: 30, height: 30 }}
                          />
                          <Stack direction="column">
                            <Typography variant="h6" mb={1}>
                              {lastVisit?.doctor?.name} {lastVisit?.doctor?.surname}
                            </Typography>
                            <Typography component="h4" gutterBottom>
                              {lastVisit?.doctor?.phoneNumber && (
                                <Stack direction="row" mb={1} spacing={2}>
                                  <PhoneIcon color="primary" /> <span>{lastVisit?.doctor?.phoneNumber}</span>
                                </Stack>
                              )}
                              {lastVisit?.doctor?.email && (
                                <Stack direction="row" mb={1} spacing={2}>
                                  <MailOutlineIcon color="primary" /> <span>{lastVisit?.doctor?.email}</span>
                                </Stack>
                              )}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={9} p={6}>
                  <RecordTable patientRecord={patient.patientRecords} />
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
