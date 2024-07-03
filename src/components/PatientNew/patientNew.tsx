import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getPath } from "@lib/utils";
import { Save } from "@mui/icons-material";
import { Box, Button, FormControlLabel, Grid, MenuItem, Paper, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PatientNew: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [OPD, setOPD] = useState("");
  const [IDP, setIDP] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [chronicPatient, setChronicPatient] = useState(false);

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handlePostClick = () => {
    navigate("/patients");
  };

  const handleSwitchChange = (event) => {
    setChronicPatient(event.target.checked);
  };
  const handleSaveClick = async () => {
    if (!name || !surname || !address || !OPD || !IDP || !bloodGroup) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const newPatient = {
        name: name,
        surname: surname,
        address: address,
        opd: Number(OPD),
        idp: Number(IDP),
      };
      /* sistemare idp, opd sono numeri */
      /* await axios.post("/api/patient", newPatient); */
      api.patients.createPatient(newPatient);

      updatePatientsList();

      navigate("/patients");
      window.location.reload(); //aggiorna in automatico la pagina
    } catch (error) {
      console.error("Errore durante il salvataggio del nuovo dottore:", error);
    }
  };

  const updatePatientsList = () => {};

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl>
            <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
          </BreadcrumbEl>
          <BreadcrumbEl active>new</BreadcrumbEl>
        </Breadcrumb>
      </div>
      {/* titolo */}
      <SectionHeader title="NEW PATIENT"></SectionHeader>
      {/* box form */}
      <div id="patfilter">
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
                  label="Address"
                  variant="outlined"
                  size="small"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="OPD"
                  variant="outlined"
                  size="small"
                  value={OPD}
                  onChange={(e) => setOPD(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="outlined-basic"
                  required
                  fullWidth
                  label="IDP"
                  variant="outlined"
                  size="small"
                  value={IDP}
                  onChange={(e) => setIDP(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Blood Group"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  select
                  onChange={handleBloodGroupChange}
                >
                  {Object.values(PatientDTOBloodGroupEnum).map((option) => (
                    <MenuItem key={option} value={option}>
                      {getBloodType(option)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  value="Chronic Patient"
                  control={<Switch />}
                  label="Chronic Patient"
                  onChange={handleSwitchChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Notes" fullWidth multiline rows={3}></TextField>
              </Grid>
              {/* inserire funzione salva "crea" doctor */}
              <Grid item xs={1}>
                <Button className="savebt" variant="contained" onClick={handleSaveClick}>
                  SAVE <Save className="save"></Save>
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button className="backbt" variant="outlined" onClick={handlePostClick}>
                  BACK
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export default PatientNew;
