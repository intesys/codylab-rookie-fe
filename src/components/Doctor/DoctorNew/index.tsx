import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const DoctorNew: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");

  const handleBackButton = () => {
    navigate(getPath(DOCTORS_PATH));
  };

  const handleSaveButton = () => {
    api.doctors.createDoctor({ name, surname, profession, email, phoneNumber });
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="NEW DOCTOR" />
      <form onSubmit={handleSaveButton}>
        <Paper className="paper">
          <Grid container columnSpacing={2} rowSpacing={2} alignItems="center">
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
                label="Profession"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setProfession(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Phone number"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => setPhonenumber(e.target.value)}
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
        </Paper>
      </form>
    </div>
  );
};

export default DoctorNew;
