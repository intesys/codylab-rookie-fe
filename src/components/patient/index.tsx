import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { PATIENTS_PATH } from "../../config/paths";
import { PatientDTO } from "../../generated/axios";
import useGetDetail from "../../hooks/useGetDetail";
import { DetailType } from "../../lib/types";
import { getBloodType, getEditDetailPath, getPath } from "../../lib/utils";
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

                    <br />
                    <Typography textTransform="uppercase">info agg</Typography>
                    <br />

                    {/* Last Doctor */}
                    <Divider color={grey[500]} />
                    <Typography my={4} textTransform="uppercase">
                      LAST DOCTOR WHO VISITED THE PATIENT
                    </Typography>
                  </Box>
                </Grid>

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
