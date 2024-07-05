import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Button, FormControlLabel, Grid, MenuItem, Paper, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PatientEdit: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [opd, setOpd] = useState(0);
  const [idp, setIdp] = useState(0);
  const [bloodGroup, setBloodGroup] = useState();
  const [chronicPatient, setIsChronicPatient] = useState(false);
  const [notes, setNotes] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientDTO>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response) => {
      setPatient(response.data);
    });
    setLoading(false);
  }, [loading, id]);

  useEffect(() => {
    if (!patient) {
      return;
    }
    setName(patient.name);
    setSurname(patient.surname);
    setAddress(patient.address);
    setIdp(patient.idp);
    setOpd(patient.opd);
    setBloodGroup(patient.bloodGroup);
    setIsChronicPatient(patient.chronicPatient);
    setNotes(patient.notes);
  }, [patient]);

  const handleSubmit = () => {
    api.patients.updatePatient(Number(id), { name, surname, address, opd, idp, bloodGroup, chronicPatient, notes });
    navigate(getDetailPath(PATIENTS_PATH, id));
    window.location.reload();
  };
  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsChronicPatient(event.target.checked);
  };
  const handleBackButton = () => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="EDIT PATIENT" />
      <Paper className="paper" style={{ padding: "30px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={name}
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
                value={surname}
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
                value={address}
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
                value={idp}
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
                value={opd}
                onChange={(e) => setOpd(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={4}>
              {bloodGroup && (
                <TextField
                  label="Blood Group"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
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
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                value={chronicPatient}
                control={<Switch checked={chronicPatient} />}
                label="Chronic Patient"
                onChange={handleSwitchChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Notes"
                value={notes}
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

export default PatientEdit;
