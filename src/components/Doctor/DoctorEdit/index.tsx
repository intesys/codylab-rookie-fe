import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DoctorEdit: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<DoctorDTO>();

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.doctors.getDoctor(Number(id)).then((response) => {
      setDoctor(response.data);
    });
    setLoading(false);
  }, [loading, id]);

  useEffect(() => {
    if (!doctor) {
      return;
    }
    setName(doctor.name);
    setSurname(doctor.surname);
    setProfession(doctor.profession);
    setEmail(doctor.email);
    setPhonenumber(doctor.phoneNumber);
  }, [doctor]);

  const handleSaveButton = () => {
    api.doctors.updateDoctor(Number(id), { name, surname, profession, email, phoneNumber });
  };

  const handleBackButton = () => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="EDIT DOCTOR" />
      <form onSubmit={handleSaveButton}>
        <Paper className="paper">
          <Grid container columnSpacing={2} rowSpacing={2} alignItems="center">
            <Grid item xs={4}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
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
                value={surname}
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
                value={profession}
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
                value={email}
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
                value={phoneNumber}
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
    </>
  );
};

export default DoctorEdit;
