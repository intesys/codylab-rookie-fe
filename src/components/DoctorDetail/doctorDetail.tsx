// src/DoctorDetail.js
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import { Edit, MailOutline, Phone } from "@mui/icons-material";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./doctorDetail.scss";

const newRecord = {};

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, loading] = useGetDetail(api.doctors.getDoctor, newRecord, Number(id));
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.doctors.getPatients(id);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (id) {
      fetchPatients();
    }
  }, [id]);

  const handleEditClick = (id) => {
    navigate(`:${id}/edit`);
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
            <Edit className="edit" onClick={() => handleEditClick(doctor.id)}></Edit>
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
            <Typography variant="h6">Patients</Typography>
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
                {patients.map((patient) => (
                  <tr key={patient.pid}>
                    <td>{patient.pid}</td>
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
