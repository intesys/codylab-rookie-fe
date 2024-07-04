import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PatientEdit: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [opd, setOpd] = useState(0);
  const [idp, setIdp] = useState(0);
  const [bloodGroup, setBloodGroup] = useState();
  const [chronicPatient, setChronicPatient] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [notes, setNotes] = useState("");

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientDTO>();

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
    setOpd(patient.opd);
    setIdp(patient.idp);
    setBloodGroup(patient.bloodGroup);
    setChronicPatient(patient.chronicPatient);
    setNotes(patient.notes);
  }, [patient]);

  const handleSaveButton = (e: React.FormEvent) => {
    e.preventDefault();
    api.patients
      .updatePatient(Number(id), { name, surname, address, opd, idp, bloodGroup, chronicPatient, notes })
      .then(() => {
        enqueueSnackbar("Patient edited successfully!", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      });
  };

  const handleBackButton = () => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title={<b>EDIT PATIENT</b>}></SectionHeader>
      <div className="box">
        <Box>
          <form onSubmit={handleSaveButton}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  id="outlined-name"
                  label="Name"
                  variant="outlined"
                  value={name}
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
                  value={surname}
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
                  value={address}
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
                  value={opd}
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
                  value={idp}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setIdp(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={4}>
                {bloodGroup && (
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
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-notes"
                  label="Notes"
                  variant="outlined"
                  multiline
                  value={notes}
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
                  <Button variant="outlined" style={{ marginLeft: "8px" }} onClick={() => handleBackButton()}>
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
export default PatientEdit;
