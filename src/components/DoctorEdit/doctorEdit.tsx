import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Save } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DoctorEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the doctor ID from the URL params
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Recupera i dati del medico in base all'ID e li sostituisce con i dati vuoiti (nei textfield)
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctor/${id}`);
        const doctor = response.data;
        setName(doctor.name);
        setSurname(doctor.surname);
        setProfession(doctor.profession);
        setEmail(doctor.email);
        setPhoneNumber(doctor.phoneNumber);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handlePostClick = () => {
    navigate("/doctors");
  };

  const handleSaveClick = async () => {
    if (!name || !surname || !profession || !email || !phoneNumber) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      // Creare l'oggetto doctorDTO con i dati del modulo
      const updatedDoctor = {
        name: name,
        surname: surname,
        profession: profession,
        email: email,
        phoneNumber: phoneNumber,
      };

      // Eseguire la richiesta PUT per aggiornare i dati del medico
      await axios.put(`/api/doctor/${id}`, updatedDoctor);

      // una volta finito riporta l'utente nella schermata "home doctor"
      navigate("/doctors");
    } catch (error) {
      console.error("Error updating doctor:", error);
      // in caso di errori lo dice
    }
  };

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl>
            <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
          </BreadcrumbEl>
          <BreadcrumbEl active>edit</BreadcrumbEl>
        </Breadcrumb>
      </div>
      <SectionHeader title="EDIT DOCTOR"></SectionHeader>
      <div id="docfilter">
        <Paper elevation={1}>
          <Box component="section" sx={{ p: 5 }}>
            <Grid id="textfieldspace" container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="Surname"
                  variant="outlined"
                  size="small"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="Profession/Specialization"
                  variant="outlined"
                  size="small"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button className="savebt" variant="contained" sx={{ mt: 2 }} onClick={handleSaveClick}>
              SAVE <Save className="save"></Save>
            </Button>
            <Button className="backbt" variant="outlined" onClick={handlePostClick} sx={{ mt: 2, ml: 2 }}>
              BACK
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export default DoctorEdit;
