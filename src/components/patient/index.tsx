import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
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

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PhoneIcon from "@mui/icons-material/Phone";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { DATE_FORMAT } from "../../config/date";
import { PATIENTS_PATH } from "../../config/paths";
import { PatientDTO } from "../../generated/axios";
import useGetDetail from "../../hooks/useGetDetail";
import { DetailType } from "../../lib/types";
import { generateAvatarImage, getBloodType, getEditDetailPath, getPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import DetailHeader from "../Layout/DetailHeader";
import SectionHeader from "../Layout/SectionHeader";
import PatientRecordTable from "./PatientRecordsTable/index";

const getPatient = api.patients.getPatient;
const deletePatient = api.patients.deletePatient;

const emptyRecord = {};

const StaffMember: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, loading] = useGetDetail(getPatient, emptyRecord as PatientDTO, Number(id));
  const { enqueueSnackbar } = useSnackbar();

  const lastVisit = useMemo(
    () => (patient?.patientRecords && patient?.patientRecords?.length > 0 ? patient.patientRecords?.[0] : undefined),
    [patient]
  );

  const handleDelete = useCallback(() => {
    deletePatient(Number(id))
      .then(() => {
        enqueueSnackbar(`Patient ${patient.name} ${patient.surname} deleted`, { variant: "success" });
        navigate(getPath(PATIENTS_PATH));
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      });
  }, [id]);

  if (!id) return null;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient?.name} {patient?.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="Patient details">
            <Button variant="outlined" type="submit" onClick={handleDelete}>
              Delete
            </Button>
          </SectionHeader>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <DetailHeader
                record={patient}
                subTitle={patient.address}
                detailType={DetailType.PATIENT}
                edit={
                  <IconButton component={Link} to={getEditDetailPath(PATIENTS_PATH, patient.id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                }
              />
              <Grid container>
                <Grid item xs={3}>
                  <Box sx={{ background: grey[800], padding: 2.5, color: "white" }}>
                    {/* Health information */}
                    <Typography variant="subtitle1" textTransform="uppercase" component="h1" gutterBottom>
                      Health information
                    </Typography>
                    <Divider color={grey[500]} />
                    {/* Patient ID */}
                    <Stack my={2}>
                      <Typography textTransform="uppercase" color={grey[500]}>
                        Patient ID
                      </Typography>
                      <Typography variant="h4">{patient?.id}</Typography>
                    </Stack>
                    {/* Patient odp */}
                    {patient?.opd && (
                      <Stack my={2}>
                        <Typography textTransform="uppercase" color={grey[500]}>
                          OPD
                        </Typography>
                        <Typography variant="h4">{patient?.opd}</Typography>
                      </Stack>
                    )}
                    {/* Blood Group */}
                    {patient?.bloodGroup && (
                      <Stack my={2}>
                        <Typography textTransform="uppercase" color={grey[500]}>
                          Blood group
                        </Typography>
                        <Typography variant="h4">{getBloodType(patient?.bloodGroup)}</Typography>
                      </Stack>
                    )}
                    <Divider color={grey[500]} />
                    {/* Notes */}
                    <Typography component="p" my={2}>
                      <strong color={grey[500]}>Notes</strong> <br />
                      {patient?.notes}
                    </Typography>
                    <Divider color={grey[500]} />
                    {/* Chronic patient */}
                    <Typography textTransform="uppercase" my={2}>
                      Chronic patient: {patient.chronicPatient ? "YES" : "NO"}
                    </Typography>

                    <Divider color={grey[500]} />
                    {/* DA FARE */}

                    {lastVisit && (
                      <>
                        <List sx={{ width: "100%", my: 2 }} dense>
                          <ListItem alignItems="flex-start">
                            <ListItemIcon>
                              <AccessTimeIcon sx={{ fill: "white" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Last admission:"
                              secondary={
                                <Typography sx={{ display: "inline" }} component="span" variant="body2">
                                  {dayjs(lastVisit?.date).format(DATE_FORMAT)}
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
                            <Stack direction="column" spacing={2}>
                              <Stack direction="row">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={generateAvatarImage(DetailType.DOCTOR, lastVisit?.doctor?.id)}
                                  sx={{ width: 50, height: 50, marginRight: 1 }}
                                />
                                <Typography variant="h6" mb={1}>
                                  {lastVisit?.doctor?.name} <br /> {lastVisit?.doctor?.surname}
                                </Typography>
                              </Stack>
                              <Typography component="h4" gutterBottom>
                                {lastVisit?.doctor?.phoneNumber && (
                                  <Stack direction="row" mb={1} spacing={1}>
                                    <PhoneIcon color="primary" /> <span>{lastVisit?.doctor?.phoneNumber}</span>
                                  </Stack>
                                )}
                                {lastVisit?.doctor?.email && (
                                  <Stack direction="row" mb={1} spacing={1}>
                                    <MailOutlineIcon color="primary" /> <span>{lastVisit?.doctor?.email}</span>
                                  </Stack>
                                )}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Box>
                </Grid>

                {/* Tabella records */}
                <Grid item xs={9} p={6}>
                  <PatientRecordTable patient={patient} />
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
