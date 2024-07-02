import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DATE_FORMAT } from "@config/date";
import { PATIENTS_PATH } from "@config/paths";
import { DoctorDTO, PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getBloodType, getEditDetailPath, getNewRecordDetailPath, getPath } from "@lib/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Avatar, Button, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PatientDetail: React.FC = () => {
  const [patient, setPatient] = useState<PatientDTO>();
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<DoctorDTO>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response) => {
      setPatient(response.data);
    });
    if (!patient) {
      return;
    }
    setLoading(false);
  }, [loading, id]);

  if (!patient) {
    return <>Patient not found</>;
  }

  const handleDeleteClick = () => {
    api.patients.deletePatient(Number(id));
  };

  const handleEditClick = () => {
    navigate(getEditDetailPath(PATIENTS_PATH, id));
  };

  const handleNewRecordClick = () => {
    navigate(getNewRecordDetailPath(PATIENTS_PATH, id));
  };
  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient.name} {patient.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="PATIENT DETAILS">
        <Button variant="outlined" onClick={handleDeleteClick}>
          <DeleteIcon style={{ marginRight: 7 }} /> DELETE
        </Button>
      </SectionHeader>
      <Paper>
        <Grid container rowSpacing={2} columnSpacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={generateAvatarImage(DetailType.PATIENT, patient.id)}
              sx={{ height: 100, width: 100 }}
              className="avatar"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              {patient.name} <b>{patient.surname}</b>
              <EditIcon className="icons" onClick={() => handleEditClick()} />
              <br />
            </Typography>
            <Typography variant="body1">{patient.address}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={3}>
          <Card>
            <CardContent className="card">
              <Typography variant="body1">HEALTH INFORMATION</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">PATIENT ID</Typography>
              <Typography variant="h4">{patient.id}</Typography>
              <Typography variant="body1">OPD</Typography>
              <Typography variant="h4">{patient.opd}</Typography>
              <Typography variant="body1">BLOOD GROUP</Typography>
              <Typography variant="h4">{getBloodType(patient.bloodGroup)}</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">Notes</Typography>
              <Typography variant="body1">{patient.notes}</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">
                <AccessTimeIcon /> Last admission:
                {patient.lastAdmission}
              </Typography>
              <Typography variant="body1">
                <MedicalServicesIcon /> Reason of visit:
              </Typography>
              <Typography>
                <VaccinesIcon /> Treatment made:
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">LAST DOCTOR WHO VISITED THE PATIENT</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Paper style={{ margin: 30, padding: 10 }}>
            <Grid container justifyContent={"space-between"} style={{ marginBottom: 20 }}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <b>Records</b>
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={handleNewRecordClick}>
                  <AddIcon />
                  RECORD
                </Button>
              </Grid>
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item xs={2}>
                <Typography variant="body1">
                  <b>Date</b>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">
                  <b>Type of</b>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">
                  <b>Reason</b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1">
                  <b>Treatment made</b>
                </Typography>
              </Grid>
              <Grid item xs={2} justifyContent={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body1">
                  <b>Doctor</b>
                </Typography>
              </Grid>
              <Grid item xs={1} justifyContent={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">
                  <b>Actions</b>
                </Typography>
              </Grid>
              {patient.patientRecords?.map((patientRecord) => (
                <>
                  <Divider
                    style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }}
                  />
                  <Grid item xs={2}>
                    <Typography variant="body1">{dayjs(patientRecord.date).format(DATE_FORMAT)}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">{patientRecord.typeVisit}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">{patientRecord.reasonVisit}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">{patientRecord.treatmentMade}</Typography>
                  </Grid>
                  <Grid item xs={2} justifyContent={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="body1">
                      {patientRecord.doctor?.name} {patientRecord.doctor?.surname}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} justifyContent={{ display: "flex", justifyContent: "center" }}>
                    <DeleteIcon />
                  </Grid>
                </>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default PatientDetail;