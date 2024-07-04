import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH, PATIENTS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
    setName("" + doctor.name);
    setSurname("" + doctor.surname);
    setProfession("" + doctor.profession);
    setEmail("" + doctor.email);
    setPhonenumber("" + doctor.phoneNumber);
  }, [doctor]);

  const handleSubmit = () => {
    api.doctors.updateDoctor(Number(id), { name, surname, profession, email, phoneNumber });
    navigate(getDetailPath(DOCTORS_PATH, id));
    window.location.reload();
  };
  const handleBackButton = () => {
    navigate(getDetailPath(DOCTORS_PATH, id));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Doctor</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>
            {doctor?.name} {doctor?.surname}
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <h2>EDIT PATIENT</h2>
      <div className="box-new-patient">
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              rowGap: 2,
              columnGap: 2,
              display: "grid",
              gridTemplateColumns: "repeat(21, 1fr)",
            }}
          >
            <TextField
              sx={{ gridRow: "1", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={{ gridRow: "1", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              size="small"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              sx={{ gridRow: "1", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="Profession"
              variant="outlined"
              size="small"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            <TextField
              sx={{ gridRow: "2", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ gridRow: "2", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              size="small"
              value={phoneNumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />

            <Button
              type="submit"
              className="button-save"
              sx={{ gridRow: "5", gridColumn: "span 3" }}
              variant="contained"
            >
              Save
              <img width="22" height="22" src="https://img.icons8.com/ios/50/FFFFFF/save--v1.png" alt="save--v1" />
            </Button>
            <Button sx={{ gridRow: "5", gridColumn: "span 2" }} variant="outlined" onClick={() => handleBackButton()}>
              Back
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default DoctorEdit;
