import React, { useState } from "react";

import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, FormControlLabel, Grid, MenuItem, Switch, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const PatientNew: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [opd, setOpd] = useState(0);
  const [idp, setIdp] = useState(0);
  const [bloodGroup, setBloodGroup] = useState();
  const [chronicPatient, setChronicPatient] = useState(false);
  const [notes, setNotes] = useState("");

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleNewClick = () => {
    navigate(getPath(PATIENTS_PATH));
  };
  const handleSubmit = () => {
    api.patients.createPatient({ name, surname, address, opd, idp, bloodGroup, chronicPatient, notes });
  };
  const handleSwitchChange = (event) => {
    setChronicPatient(event.target.checked);
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="NEW PATIENT"></SectionHeader>

      <div className="box">
        <Box>
          <form className="patientSearchForm" onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  id="outlined-name"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-surname"
                  label="Surname"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-address"
                  label="Address"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-opd"
                  label="OPD"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setOpd(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-idp"
                  label="IDP"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setIdp(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-bloodgroup"
                  label="Blood Group"
                  required
                  variant="outlined"
                  fullWidth
                  select
                  value={bloodGroup}
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
                  id="outlined-notes"
                  label="Notes"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-start">
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    SAVE <SaveIcon style={{ marginLeft: "8px" }} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" style={{ marginLeft: "8px" }} onClick={handleNewClick}>
                    BACK
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default PatientNew;
