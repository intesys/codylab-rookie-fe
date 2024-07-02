import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControlLabel, Grid, MenuItem, Paper, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PatientNew: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [opd, setOpd] = useState(0);
  const [idp, setIdp] = useState(0);
  const [bloodGroup, setBloodGroup] = useState();
  const [chronicPatient, setIsChronicPatient] = useState(false);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsChronicPatient(event.target.checked);
  };

  const handleBackButton = () => {
    navigate(getPath(PATIENTS_PATH));
  };

  const handleSubmit = () => {
    api.patients.createPatient({ name, surname, address, opd, idp, bloodGroup, chronicPatient });
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="NEW PATIENT" />
      <Paper className="paper">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Surname"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setSurname(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="IDP"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setIdp(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="OPD"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setOpd(Number(e.target.value))}
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
              <TextField
                fullWidth
                variant="outlined"
                label="Notes"
                multiline
                rows={3}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" type="submit">
                    SAVE <SaveIcon className="saveIcon" />
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={handleBackButton}>
                    BACK
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default PatientNew;
