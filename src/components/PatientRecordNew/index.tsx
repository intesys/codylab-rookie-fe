import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { doctorsFilterReducer } from "@components/Doctors/lib";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getDetailPath, getPath } from "@lib/utils";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
/* import "./index.scss"; */

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

const doctorListApi = api.doctors.getListDoctor;

const PatientRecordNew: React.FC = () => {
  const [patient, setPatient] = useState<PatientDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});

  const [doctors, loading2] = useGetList(doctorListApi, filter);
  const navigate = useNavigate();

  const [patientId, setPatientId] = React.useState(Number(id));
  const [doctorId, setDoctorId] = React.useState(Number());
  const [date, setDate] = React.useState(dayjs());
  const [typeVisit, setTypeOfVisit] = React.useState("");
  const [reasonVisit, setReasonOfVisit] = React.useState("");
  const [treatmentMade, setTreatmentMade] = React.useState("");

  const handleChangeForm = (event: SelectChangeEvent) => {
    const selectedDoctorId = Number(event.target.value);
    const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId);
    if (selectedDoctor) {
      setDoctorId(selectedDoctorId);
    }
  };

  const handlBackClick = () => {
    navigate(`/patients/${id}`);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPatientId(Number(id));
      api.patientRecords.createPatientRecord({
        patientId,
        doctor: doctors.find((doctor) => doctor.id === doctorId),
        date: date.toISOString(),
        typeVisit,
        reasonVisit,
        treatmentMade,
      });
      console.log(date.toISOString());
      enqueueSnackbar(`Success: Paziente AGGIUNTO`, { variant: "success" });
    },
    [patientId, doctorId, date, typeVisit, reasonVisit, treatmentMade]
  );

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response) => {
      setPatient(response.data);
    });
    if (!patient) {
      return;
    }
    setLoading(false);
  }, [loading, id]);

  if (!patient) {
    return <>Patient not found</>;
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>
            {patient.name} {patient.surname}
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>

      <h2>
        {patient.name} {patient.surname}: NEW PATIENT RECORD
      </h2>
      <div className="box-new-patient">
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              rowGap: 2,
              columnGap: 2,
              display: "grid",
              gridTemplateColumns: "repeat(22, 1fr)",
            }}
          >
            <DatePicker
              sx={{ gridRow: "1", gridColumn: "span 5" }}
              label="Date"
              value={date}
              format="DD-MM-YYYY"
              onChange={handleDateChange}
            />

            <TextField
              sx={{ gridRow: "1", gridColumn: "span 8" }}
              required
              id="outlined-basic"
              label="Type of visit"
              variant="outlined"
              size="small"
              value={typeVisit}
              onChange={(e) => setTypeOfVisit(e.target.value)}
            />

            <FormControl sx={{ gridRow: "1", gridColumn: "span 8" }}>
              <InputLabel required id="demo-simple-select-label">
                Name
              </InputLabel>
              <Select
                required
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeForm}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name} {doctor.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{ gridRow: "2", gridColumn: "span 11" }}
              required
              id="outlined-multiline-static"
              label="Reason of visit"
              multiline
              rows={4}
              value={reasonVisit}
              onChange={(e) => setReasonOfVisit(e.target.value)}
            />
            <TextField
              sx={{ gridRow: "2", gridColumn: "span 11" }}
              required
              id="outlined-multiline-static"
              label="Treatment made"
              multiline
              rows={4}
              value={treatmentMade}
              onChange={(e) => setTreatmentMade(e.target.value)}
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

export default PatientRecordNew;
