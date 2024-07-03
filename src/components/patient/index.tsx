import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DATE_FORMAT } from "@config/date";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getBloodType, getEditDetailPath, getNewRecordDetailPath, getPath } from "@lib/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PhoneIcon from "@mui/icons-material/Phone";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Avatar, Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss";

const Patient: React.FC = () => {
  const [patient, setPatient] = useState<PatientDTO>();
  const [loading, setLoading] = useState(true);
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
    navigate("/patients");
    window.location.reload();
  };

  const handleDeleteRecordClick = (id: number) => {
    api.patientRecords.deletePatientRecord(id);
  };

  const handleEditClick = () => {
    navigate(getEditDetailPath(PATIENTS_PATH, id));
  };
  const handleDoctorClick = (id: string) => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  };

  const handleNewRecordClick = () => {
    navigate(getNewRecordDetailPath(PATIENTS_PATH, id));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient.name} {patient.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title={<b>PATIENT DETAILS</b>}>
        <Button variant="outlined" onClick={handleDeleteClick}>
          <DeleteIcon /> DELETE
        </Button>
      </SectionHeader>
      <div className="patient-details-content">
        <Paper className="details-paper">
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
                <EditIcon
                  className="icons"
                  style={{ color: "red", marginLeft: 8 }}
                  onClick={() => handleEditClick(id)}
                />
              </Typography>
              <Typography variant="body1">{patient.address}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <div className="patient-details-wrapper">
          <Box className="details-box">
            <Typography variant="h7" className="details-header">
              HEALTH INFORMATION
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item" color="gray">
              PATIENT ID
            </Typography>
            <Typography variant="h4" className="contact-item" color="white">
              {patient.id}
            </Typography>
            <Typography variant="body1" className="contact-item" color="gray">
              <br></br>
              OPD
            </Typography>
            <Typography variant="h4" className="contact-item" color="white">
              {patient.opd}
            </Typography>
            <Typography variant="body1" className="contact-item" color="gray">
              <br></br>
              BLOOD GROUP
            </Typography>
            <Typography variant="h4" className="contact-item" color="white">
              {getBloodType(patient.bloodGroup)}
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item" color="white">
              <b>Notes</b>
            </Typography>
            <Typography variant="body1" className="contact-item" color="white">
              {patient.notes}
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item">
              CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1">
              <AccessTimeIcon /> Last admission <br />
              {patient.patientRecords &&
                patient.patientRecords?.length > 0 &&
                dayjs(patient.patientRecords[0].date).format(DATE_FORMAT)}
            </Typography>
            <Typography variant="body1">
              <MedicalInformationIcon /> Reason of visit: <br />
              {patient.patientRecords && patient.patientRecords?.length > 0 && patient.patientRecords[0].reasonVisit}
            </Typography>
            <Typography>
              <VaccinesIcon /> Treatment made: <br />
              {patient.patientRecords && patient.patientRecords?.length > 0 && patient.patientRecords[0].treatmentMade}
            </Typography>

            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="h7" className="details-header">
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
                    <Typography variant="body1">
                      {patient.patientRecords[0].doctor.name}
                      <br />
                      {patient.patientRecords[0].doctor.surname}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <PhoneIcon className="contacts" style={{ color: "red" }} />
                      {patient.patientRecords[0].doctor.phoneNumber}
                      <br />
                      <MailOutlineIcon className="contacts" style={{ color: "red" }} />
                      {patient.patientRecords[0].doctor.email}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
            <Box className="last-doctor"></Box>
          </Box>
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
                      <DeleteOutlineIcon
                        onClick={() => handleDeleteRecordClick(Number(patientRecord.id))}
                        style={{ color: "grey" }}
                      />
                    </Grid>
                  </>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Patient;
