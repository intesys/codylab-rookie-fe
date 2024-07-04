import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Box, Button, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const DoctorNew: React.FC = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const navigate = useNavigate();

  const handlBackClick = () => {
    navigate(`/doctors`);
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      api.doctors.createDoctor({ name, surname, profession, email, phoneNumber });
      enqueueSnackbar(`Success: Dottore AGGIUNTO`, { variant: "success" });
      setName("");
      setSurname("");
      setProfession("");
      setEmail("");
      setPhoneNumber("");
    },
    [name, surname, profession, email, phoneNumber]
  );

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <h2>NEW DOCTOR</h2>
      <div className="box-new-doctor">
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
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              type="submit"
              className="button-save"
              sx={{ gridRow: "3", gridColumn: "span 2" }}
              variant="contained"
            >
              Save
              <img width="22" height="22" src="https://img.icons8.com/ios/50/FFFFFF/save--v1.png" alt="save--v1" />
            </Button>
            <Button sx={{ gridRow: "3", gridColumn: "span 1" }} variant="outlined" onClick={() => handlBackClick()}>
              Back
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default DoctorNew;
