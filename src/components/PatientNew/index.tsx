import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getPath } from "@lib/utils";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

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

const PatientNew: React.FC = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [opd, setOpd] = React.useState(Number);
  const [idp, setIdp] = React.useState(Number);
  const [notes, setNotes] = React.useState("");
  const [bloodGroup, setBloudGroop] = React.useState<PatientDTOBloodGroupEnum>();
  const [chronicPatient, setChronicPatient] = React.useState(false);
  const navigate = useNavigate();

  const handlBackClick = () => {
    navigate(`/patients`);
  };

  const handleChangeForm = (event: SelectChangeEvent) => {
    setBloudGroop(event.target.value as PatientDTOBloodGroupEnum);
  };

  const handleChangeSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChronicPatient(event.target.checked);
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      api.patients
        .createPatient({ name, surname, address, opd, idp, bloodGroup, chronicPatient, notes })
        .then(() => {
          enqueueSnackbar(`Success: Paziente AGGIUNTO`, { variant: "success" });
          setName("");
          setSurname("");
          setAddress("");
          setOpd(0);
          setIdp(0);
          setBloudGroop(undefined);
          setChronicPatient(false);
          setNotes("");
        })
        .catch((error) => {
          enqueueSnackbar(`Error: ${error}`, { variant: "error" });
        });
    },
    [name, surname, address, opd, idp, bloodGroup, chronicPatient]
  );

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <h2>NEW PATIENT</h2>
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
              label="Address"
              variant="outlined"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              sx={{ gridRow: "2", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="OPD"
              variant="outlined"
              size="small"
              value={opd}
              onChange={(e) => setOpd(Number(e.target.value))}
            />
            <TextField
              sx={{ gridRow: "2", gridColumn: "span 7" }}
              required
              id="outlined-basic"
              label="IDP"
              variant="outlined"
              size="small"
              value={idp}
              onChange={(e) => setIdp(Number(e.target.value))}
            />
            <FormControl sx={{ gridRow: "2", gridColumn: "span 7" }}>
              <InputLabel required id="demo-simple-select-label">
                Blood Group
              </InputLabel>
              <Select
                required
                size="small"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChangeForm}
                input={<OutlinedInput label="Blood Group" />}
                MenuProps={MenuProps}
              >
                {Object.values(PatientDTOBloodGroupEnum).map((bloodGroup) => (
                  <MenuItem key={bloodGroup} value={bloodGroup}>
                    {getBloodType(bloodGroup)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ gridRow: "3", gridColumn: "span 10" }}
              control={<Switch checked={chronicPatient} onChange={handleChangeSlide} name="jason" />}
              label="Chronic patient"
            />

            <TextField
              sx={{ gridRow: "4", gridColumn: "span 21" }}
              id="outlined-multiline-static"
              label="Notes"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            <Button sx={{ gridRow: "5", gridColumn: "span 2" }} variant="outlined" onClick={() => handlBackClick()}>
              Back
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default PatientNew;
