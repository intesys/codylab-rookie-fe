import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DoctorEdit: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    setPhoneNumber(doctor.phoneNumber);
  }, [doctor]);

  const handleSaveButton = () => {
    api.doctors.updateDoctor(Number(id), { name, surname, profession, email, phoneNumber });
  };

  const handleBackButton = () => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  };

  /**/
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title={<b>EDIT DOCTOR</b>}></SectionHeader>
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
                  id="outlined-profession"
                  label="Profession"
                  required
                  value={profession}
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
                  value={email}
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
                  value={phoneNumber}
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
export default DoctorEdit;
