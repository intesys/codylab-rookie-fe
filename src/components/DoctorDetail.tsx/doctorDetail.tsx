// src/DoctorDetail.js
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getEditDetailPath } from "@lib/utils";
import { Edit, MailOutline, Phone } from "@mui/icons-material";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./doctorDetail.scss";

const newRecord = {};

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, loading] = useGetDetail(api.doctors.getDoctor, newRecord, Number(id));
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const navigate = useNavigate();

  /* useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response) => {
      setPatient(response.data);
    });
    if (!patient) {
      return;
    }
    setMostRecentRecord(
      patient.patientRecords?.reduce((maxDate, record) => (record.date > maxDate.date ? record : maxDate))
    );
    setLoading(false);
  }, [loading, id]); */

  const handleEditClick = (id: string) => {
    navigate(getEditDetailPath(DOCTORS_PATH, id));
  };

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl active>{`${doctor.name} ${doctor.surname}`}</BreadcrumbEl>
        </Breadcrumb>
      </div>
      <SectionHeader title="DOCTOR DETAILS"></SectionHeader>
      <Paper className="doctor-details-container">
        <Avatar
          className="avatar"
          alt="icona"
          sx={{ width: 88, height: 88 }}
          src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
        />
        <div className="doctor-info">
          <Typography variant="h4">
            {doctor.name} <b>{doctor.surname}</b>
            <Edit className="edit" onClick={() => handleEditClick(String(id))}></Edit>
          </Typography>
          <Typography variant="subtitle1">{doctor.profession}</Typography>
        </div>
      </Paper>
      <Box sx={{ display: "flex" }}>
        <div className="contacts-section">
          <Typography variant="h6">CONTACTS</Typography>
          <hr className="separatore"></hr>
          <div className="contact-item">
            <span className="contact-icon">
              <Phone className="edit"></Phone>
            </span>
            <span>{doctor.phoneNumber}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">
              <MailOutline className="edit"></MailOutline>
            </span>
            <span>{doctor.email}</span>
          </div>
          <div className="lastp">
            <Typography variant="h6">LAST VISITED PATIENTS</Typography>
            <hr className="separatore"></hr>
            {doctor.latestPatients?.map((patient) => (
              <Box id="lastpatcard" key={patient.id}>
                <Avatar
                  alt="icona"
                  sx={{ width: 35, height: 35 }}
                  src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                />
                <p className="nomi-pat" sx={{ textAlign: "left" }}>
                  <Typography variant="body1">{patient.name}</Typography>
                  <Typography variant="body1">{patient.surname}</Typography>
                </p>
              </Box>
            ))}
          </div>
        </div>
        <div className="patients-section">
          <Paper>
            {/* <Typography variant="h6">Patients</Typography>
            {loadingPatients ? (
              <Typography>Loading...</Typography>
            ) : patients.length === 0 ? (
              <Typography>No patients found.</Typography>
            ) : ( */}
            <table>
              <thead>
                <tr>
                  <th>PID</th>
                  <th>OPD</th>
                  <th>IDP</th>
                  <th>Name</th>
                  <th>Surname</th>
                </tr>
              </thead>
              <tbody>
                {doctor.latestPatients?.map((patient) => (
                  <tr key={patient.pid}>
                    <td>{patient.id}</td>
                    <td>{patient.opd}</td>
                    <td>{patient.idp}</td>
                    <td>{patient.name}</td>
                    <td>{patient.surname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </div>
      </Box>
    </>
  );
};

export default DoctorDetail;
