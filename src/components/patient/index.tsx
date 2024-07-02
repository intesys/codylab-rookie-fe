import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getEditDetailPath, getPath } from "@lib/utils";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss"; // Assicurati di avere i tuoi stili personalizzati qui

const Patient: React.FC = () => {
  const [patient, setPatient] = useState<PatientDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  /*
  Typography variant="body1">{patient.lastDoctorVisitedId.name}</Typography>
  <Typography variant="body1">{patient.lastDoctorVisitedId.contact}</Typography>
  <Typography variant="body1">{patient.lastDoctorVisitedId.email}</Typography>
  */
  const handleEditClick = (id) => {
    navigate(getEditDetailPath(PATIENTS_PATH, id));
  };

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response: { data: any }) => {
      setPatient(response.data);
      setLoading(false);
    });
  }, [loading, id]);

  if (!patient) {
    return <>Patient not found</>;
  }

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
      <SectionHeader title="PATIENT DETAILS"></SectionHeader>
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
            <Typography variant="h6" className="details-header">
              HEALTH INFORMATION
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item">
              PATIENT ID: {patient.id}
            </Typography>
            <Typography variant="body1" className="contact-item">
              OPD <span className="opd-value">{patient.opd}</span>
            </Typography>
            <Typography variant="body1" className="contact-item">
              BLOOD GROUP: {patient.bloodGroup}
            </Typography>
            <Divider sx={{ my: 2, bgcolor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item">
              Notes: {patient.notes}
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="body1" className="contact-item">
              CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
            </Typography>
            <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
            <Typography variant="h6" className="details-header">
              LAST DOCTOR WHO VISITED THE PATIENT
            </Typography>
            <Box className="last-doctor"></Box>
          </Box>
        </div>
        <div className="records-section">
          <Box className="records-box">
            <Typography variant="h6" className="details-header">
              Records
            </Typography>
            <Box className="records-list">
              {patient.patientRecords.map((patientRecord) => (
                <Paper key={patientRecord.id} className="record-item">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                      <Typography variant="body1">{patientRecord.date}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">{patientRecord.typeVisit}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">{patientRecord.reasonVisit}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">{patientRecord.doctor.name}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Patient;
