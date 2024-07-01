import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Save } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DoctorNew: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePostClick = () => {
    navigate("/doctors");
  };

  const handleSaveClick = async () => {
    try {
      // Creazione dell'oggetto doctor con i dati dal form
      const newDoctor = {
        name: name,
        surname: surname,
        profession: profession,
        email: email,
        phoneNumber: phoneNumber,
      };

      // Effettua la richiesta POST per creare un nuovo dottore
      await axios.post("/api/doctor", newDoctor);

      // Dopo aver creato il dottore con successo, aggiorna la lista dei dottori nel componente Doctors
      updateDoctorsList();

      // Reindirizza l'utente alla pagina dei dottori dopo aver salvato
      navigate("/doctors");
    } catch (error) {
      console.error("Errore durante il salvataggio del nuovo dottore:", error);
      // Gestione dell'errore, ad esempio mostrando un messaggio all'utente
    }
  };

  const updateDoctorsList = () => {
    // Forza l'aggiornamento della lista dei dottori nel componente Doctors
    // Questo può essere fatto tramite un meccanismo di stato o un effetto che rilegge i dati
  };

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl>
            <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
          </BreadcrumbEl>
          <BreadcrumbEl active>new</BreadcrumbEl>
        </Breadcrumb>
      </div>
      {/* titolo */}
      <SectionHeader title="NEW DOCTOR"></SectionHeader>
      {/* box form */}
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
            {/* inserire funzione salva "crea" doctor */}
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

export default DoctorNew;
