import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH, PATIENTS_PATH, PATIENTS_RECORDS_PATH } from "@config/paths";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getBloodType, getDetailPath, getEditDetailPath, getPath } from "@lib/utils";
import { Avatar, Box, Button, CircularProgress, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import "./index.scss";

import { DATE_FORMAT } from "@config/date";
import { PatientDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const newRecord = {} as PatientDTO;

const Patient: React.FC = () => {
  const { id } = useParams();

  const [patient, loading, getDetail] = useGetDetail(api.patients.getPatient, newRecord, Number(id));

  const navigate = useNavigate();

  const handlDeletePatientClick = useCallback(() => {
    api.patients.deletePatient(Number(id)).catch((error) => {
      enqueueSnackbar(`Errore: si è verificato un problema`, { variant: "error" });
    });
    enqueueSnackbar(`Success: Dottore ELIMINATO`, { variant: "success" });
    navigate(`/patients`);
  }, [id]);

  const handlDeleteRecordClick = (recordId: number) => {
    api.patientRecords
      .deletePatientRecord(recordId)
      .then(() => {
        getDetail();
        enqueueSnackbar(`Success: Record ELIMINATO`, { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar(`error`, { variant: "error" });
      });
  };

  const handlAddRecordClick = useCallback(() => {
    navigate(`${PATIENTS_RECORDS_PATH}/new`);
  }, [navigate]);

  const handlEditPatientClick = useCallback(() => {
    navigate(getEditDetailPath(PATIENTS_PATH, id));
  }, [navigate]);

  const handleDoctorClick = (id: number) => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  };

  if (loading) {
    <CircularProgress />;
  }

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

      {/* TITOLO */}
      <div className="header">
        <h3 className="titolo">PATIENT DETAILS</h3>
        <Button variant="outlined" onClick={() => handlDeletePatientClick()}>
          <DeleteIcon></DeleteIcon>
          DELETE
        </Button>
      </div>
      {/* AVATAR, NOME, COGNOME,  PROFESSIONE*/}
      <div className="patient-details-top">
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={patient.name}
          src={generateAvatarImage(DetailType.DOCTOR, patient.id)}
        />
        <div className="patient-text-info">
          <p className="patient-name">
            {patient.name} <strong>{patient.surname} </strong>
            <ModeEditOutlineIcon
              sx={{ color: red[500] }}
              fontSize="small"
              onClick={() => handlEditPatientClick()}
              style={{
                cursor: "pointer",
              }}
            ></ModeEditOutlineIcon>
          </p>
          <p className="patient-address">{patient.address}</p>
        </div>
      </div>

      <div className="bottom-information">
        {/* HEALT INFORMATION, NOTES, CHRONIC PATIENT, LAST DOCTOR VISITED*/}
        <div className="patient-details-left-bottom">
          <h4 className="patient-details-healt-information">HEALT INFORMATION</h4>
          <div className="border"></div>
          <h4 className="patient-info-title">PATIENT ID</h4>
          <h1 className="patient-info-detail">{patient.id}</h1>
          <h4 className="patient-info-title">OPD</h4>
          <h1 className="patient-info-detail">{patient.opd}</h1>
          <h4 className="patient-info-title">BLOOD GROUP</h4>
          <h1 className="patient-info-detail">{patient.bloodGroup ? getBloodType(patient.bloodGroup) : "N/A"}</h1>
          <div className="border"></div>
          <h4>Notes: {patient.notes}</h4>
          <div className="border"></div>
          <h4>CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}</h4>
          <div className="border"></div>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <AccessTimeIcon className="patient-details-time-icon"></AccessTimeIcon>
            <div className="patient-text-info">
              <p className="patient-details-email-text">Last admission:</p>
              <p className="patient-details-date-text">
                {patient.patientRecords &&
                  patient.patientRecords?.length > 0 &&
                  dayjs(patient.patientRecords[0].date).format(DATE_FORMAT)}
              </p>
            </div>
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <MedicalInformationIcon className="patient-details-time-icon"></MedicalInformationIcon>
            <div className="patient-text-info">
              <p className="patient-details-email-text">Reason of visit:</p>
              <p className="patient-details-date-text">
                {patient.patientRecords && patient.patientRecords?.length > 0 && patient.patientRecords[0].reasonVisit}
              </p>
            </div>
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <ModeEditOutlineIcon className="patient-details-time-icon"></ModeEditOutlineIcon>
            <div className="patient-text-info">
              <p className="patient-details-email-text">Treatment made:</p>
              <p className="patient-details-date-text">
                {patient.patientRecords &&
                  patient.patientRecords?.length > 0 &&
                  patient.patientRecords[0].treatmentMade}
              </p>
            </div>
          </Grid>

          <div className="border"></div>

          <h4>LAST DOCTOR WHO VISIT THE PATIENT</h4>
          {patient.patientRecords && patient.patientRecords.length > 0 && patient.patientRecords[0].doctor && (
            <div
              className="box-last-patient"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleDoctorClick(Number(patient.patientRecords[0].doctor?.id))}
            >
              <div>
                <Avatar
                  alt="Remy Sharp"
                  src={generateAvatarImage(DetailType.DOCTOR, patient.patientRecords[0].doctor.id)}
                  sx={{ width: 50, height: 50 }}
                />
              </div>
              <p className="doctor-details-patient-name-surname">
                {patient.patientRecords[0].doctor.name} {patient.patientRecords[0].doctor.surname}
              </p>
            </div>
          )}

          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <LocalPhoneIcon className="doctor-details-phone-number-icon" sx={{ color: red[500] }}></LocalPhoneIcon>
            {patient.patientRecords && patient.patientRecords.length > 0 && (
              <p className="doctor-details-phone-number-text">{patient.patientRecords[0].doctor?.phoneNumber}</p>
            )}
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <MailOutlineIcon className="doctor-details-email-icon" sx={{ color: red[500] }}></MailOutlineIcon>
            {patient.patientRecords && patient.patientRecords.length > 0 && (
              <p className="doctor-details-email-text">{patient.patientRecords[0].doctor?.email}</p>
            )}
          </Grid>
        </div>

        {/* Record Informations*/}
        <div className="records-details-right-bottom">
          <div className="header-Record">
            <h3 className="records-details-title">Records</h3>
            <div className="botton-record">
              <Button variant="outlined" onClick={() => handlAddRecordClick()}>
                <AddIcon></AddIcon>
                RECORD
              </Button>
            </div>
          </div>
          <div className="border-potente"></div>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(50, 1fr)",
            }}
          >
            <Grid sx={{ gridRow: "1", gridColumn: "span 7" }}>
              <h4 className="title-table" dir="rtl">
                Date
              </h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 7" }}>
              <h4 className="title-table" dir="rtl">
                Type of
              </h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 12" }}>
              <h4 className="title-table" dir="rtl">
                Reason
              </h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 12" }}>
              <h4 className="title-table" dir="rtl">
                Treatment Made
              </h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 12", paddingRight: "0" }}>
              <h4 className="title-table" dir="rtl">
                Doctor
              </h4>
            </Grid>
            <Grid sx={{ gridRow: "1", gridColumn: "span 4" }}>
              <h4 dir="rtl">Actions</h4>
            </Grid>
          </Box>
          {patient.patientRecords?.map((record) => (
            <div key={record.id}>
              <div className="border"></div>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(50, 1fr)",
                  color: "grey",
                }}
              >
                <Grid sx={{ gridRow: "1", gridColumn: "span 7" }}>
                  <h4 dir="rtl">{dayjs(record.date).format(DATE_FORMAT)}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 7" }}>
                  <h4 dir="rtl">{record.typeVisit}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 12" }}>
                  <h4 dir="rtl">{record.reasonVisit}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 12" }}>
                  <h4 dir="rtl">{record.treatmentMade}</h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 12" }}>
                  <h4 dir="rtl">
                    {record.doctor?.name} {record.doctor?.surname}
                  </h4>
                </Grid>
                <Grid sx={{ gridRow: "1", gridColumn: "span 4" }}>
                  <h4 dir="rtl">
                    <DeleteOutlineIcon
                      fontSize="large"
                      onClick={() => handlDeleteRecordClick(Number(record.id))}
                      style={{
                        cursor: "pointer",
                      }}
                    ></DeleteOutlineIcon>
                  </h4>
                </Grid>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patient;
