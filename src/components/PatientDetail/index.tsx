import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DATE_FORMAT } from "@config/date";
import { DOCTORS_PATH, PATIENTS_PATH } from "@config/paths";
import { DoctorDTO, PatientRecordDTO } from "@generated/axios";
import { useGetDetail } from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import {
  generateAvatarImage,
  getBloodType,
  getDetailPath,
  getEditDetailPath,
  getNewRecordDetailPath,
  getPath,
} from "@lib/utils";
import { Call, Email } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Avatar, Button, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const newrecord = {} as DoctorDTO;
const PatientDetail: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDTO>();
  const [mostRecentRecord, setMostRecentRecord] = useState<PatientRecordDTO>();
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, loading, getDetail] = useGetDetail(api.patients.getPatient, newrecord, Number(id));

  if (!patient) {
    return <>Patient not found</>;
  }

  const handleDeleteClick = () => {
    api.patients.deletePatient(Number(id));
    navigate("/patients");
    enqueueSnackbar("Patient record deleted successfully!", { variant: "success" });
  };

  const handleDeleteRecordClick = (id: number) => {
    api.patientRecords.deletePatientRecord(id).then(() => {
      enqueueSnackbar("Patient record deleted successfully!", { variant: "success" });
      getDetail();
    });
  };

  const handleEditClick = () => {
    navigate(getEditDetailPath(PATIENTS_PATH, id));
  };

  const handleNewRecordClick = () => {
    navigate(getNewRecordDetailPath(PATIENTS_PATH, id));
  };

  const handleDoctorClick = (id: string) => {
    navigate(getDetailPath(DOCTORS_PATH, id));
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
              <EditIcon style={{ color: "red" }} className="icons" onClick={() => handleEditClick()} />
              <br />
            </Typography>
            <Typography variant="body1">{patient.address}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={3}>
          <Card style={{ backgroundColor: "rgb(56, 53, 53)" }}>
            <CardContent>
              <Typography variant="body1" style={{ color: "white" }}>
                HEALTH INFORMATION
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1" style={{ color: "#9c9c9c" }}>
                PATIENT ID
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {patient.id}
              </Typography>
              <Typography variant="body1" style={{ color: "#9c9c9c" }}>
                OPD
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {patient.opd}
              </Typography>
              <Typography variant="body1" style={{ color: "#9c9c9c" }}>
                BLOOD GROUP
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {getBloodType(patient.bloodGroup)}
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1" style={{ color: "white" }}>
                Notes
              </Typography>
              <Typography variant="body1" style={{ color: "white" }}>
                {patient.notes}
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1" style={{ color: "white" }}>
                CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1" style={{ color: "white" }}>
                <AccessTimeIcon /> Last admission: {dayjs(mostRecentRecord?.date).format(DATE_FORMAT)}
              </Typography>
              <Typography variant="body1" style={{ color: "white" }}>
                <MedicalInformationIcon /> Reason of visit: {mostRecentRecord?.reasonVisit}
              </Typography>
              <Typography style={{ color: "white" }}>
                <VaccinesIcon /> Treatment made: {mostRecentRecord?.treatmentMade}
              </Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1" style={{ color: "white" }}>
                LAST DOCTOR WHO VISITED THE PATIENT
              </Typography>
              <Grid container spacing={2} style={{ marginRight: 15, marginLeft: 15 }}>
                {patient.patientRecords && patient.patientRecords.length > 0 && patient.patientRecords[0].doctor && (
                  <>
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => handleDoctorClick(String(patient.patientRecords[0].doctor.id))}
                    >
                      <Avatar src={generateAvatarImage(DetailType.DOCTOR, patient.patientRecords[0].doctor.id)} />
                      <Typography variant="body1" style={{ color: "white" }}>
                        {patient.patientRecords[0].doctor.name}
                        <br />
                        {patient.patientRecords[0].doctor.surname}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ color: "white" }}>
                        <Call className="contacts" />
                        {patient.patientRecords[0].doctor.phoneNumber}
                        <br />
                        <Email className="contacts" />
                        {patient.patientRecords[0].doctor.email}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
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
                    <Button onClick={() => handleDeleteRecordClick(Number(patientRecord.id))}>
                      <DeleteIcon style={{ color: "black" }} />
                    </Button>
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
