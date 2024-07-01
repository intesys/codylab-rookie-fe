import React, { useState } from "react";

import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const DoctorNew: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNewClick = () => {
    navigate(getPath(DOCTORS_PATH));
  };

  const handleSubmit = () => {
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
      <SectionHeader title="NEW DOCTOR"></SectionHeader>

      <div className="box">
        <Box>
          <form className="doctorSearchForm" onSubmit={handleSubmit}>
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
                  id="outlined-profession"
                  label="Profession"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-profession"
                  label="Email"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-profession"
                  label="Phone number"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-start">
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    SAVE <SaveIcon style={{ marginLeft: "8px" }} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" style={{ marginLeft: "8px" }} onClick={() => handleNewClick()}>
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
export default DoctorNew;
