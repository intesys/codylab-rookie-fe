import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getBloodType, getDetailPath, getPath } from "@lib/utils";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
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

const emptyRecord: PatientDTO = {};

const PatientEdit: React.FC = () => {
  const snackbar = useSnackbar();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [opd, setOpd] = useState(0);
  const [idp, setIdp] = useState(0);
  const [bloodGroup, setBloodGroup] = useState<PatientDTOBloodGroupEnum>();
  const [chronicPatient, setIsChronicPatient] = useState(false);
  const [notes, setNotes] = useState("");
  const [openSelect, setOpenSelet] = React.useState(false);
  const { id } = useParams();
  const [patient, loading] = useGetDetail(api.patients.getPatient, emptyRecord, Number(id));

  const navigate = useNavigate();

  useEffect(() => {
    if (!patient) {
      return;
    }
    setBloodGroup(patient.bloodGroup);
    setName(String(patient.name));
    setSurname(String(patient.surname));
    setAddress(String(patient.address));
    setIdp(Number(patient.idp));
    setOpd(Number(patient.opd));
    setIsChronicPatient(Boolean(patient.chronicPatient));
    setNotes(String(patient.notes));
  }, [patient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api.patients
      .updatePatient(Number(id), { name, surname, address, opd, idp, bloodGroup, chronicPatient, notes })
      .then(() => {
        snackbar.enqueueSnackbar("Patient updated", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((error) => {
        snackbar.enqueueSnackbar("Error", { variant: "error" });
      });
  };

  const handleChangeForm = (event: SelectChangeEvent) => {
    setBloodGroup(event.target.value as PatientDTOBloodGroupEnum);
  };

  const handleCloseSelect = () => {
    setOpenSelet(false);
  };

  const handleOpenSelect = () => {
    setOpenSelet(true);
  };

  const handleChangeSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChronicPatient(event.target.checked);
  };

  const handlBackClick = () => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  if (loading && !patient) {
    <CircularProgress />;
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
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

            {bloodGroup && (
              <FormControl sx={{ gridRow: "2", gridColumn: "span 7" }}>
                <InputLabel id="demo-controlled-open-select-label">Blood group</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  size="small"
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  value={bloodGroup}
                  label="Blood group"
                  onChange={handleChangeForm}
                  MenuProps={MenuProps}
                >
                  {Object.values(PatientDTOBloodGroupEnum).map((option) => (
                    <MenuItem key={option} value={option} selected={bloodGroup === option}>
                      {getBloodType(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControlLabel
              sx={{ gridRow: "3", gridColumn: "span 10" }}
              value={chronicPatient}
              control={<Switch checked={chronicPatient} onChange={handleChangeSlide} name="jason" />}
              label="Chronic patient"
            />
            <TextField
              sx={{ gridRow: "4", gridColumn: "span 21" }}
              id="outlined-multiline-static"
              label="Notes"
              multiline
              value={notes}
              rows={4}
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

export default PatientEdit;
