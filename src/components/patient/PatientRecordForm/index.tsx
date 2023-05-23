import { Save } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../config/api";
import { DATE_FORMAT } from "../../../config/date";
import { PATIENTS_PATH } from "../../../config/paths";
import { DoctorDTO, PatientRecordDTO } from "../../../generated/axios";
import { getDetailPath } from "../../../lib/utils";

const createPatientRecord = api.patientRecords.createPatientRecord;
const updatePatientRecord = api.patientRecords.updatePatientRecord;
const getListDoctor = api.doctors.getListDoctor;

interface IProps extends React.PropsWithChildren {
  record: PatientRecordDTO;
  patientId?: number | string;
}

const PatientRecordForm: FC<IProps> = ({ record, patientId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [saveLoading, setSaveLoading] = useState(false);
  const [date, setDate] = useState(record?.date ?? dayjs());
  const [typeVisit, setTypeVisit] = useState(record?.typeVisit ?? "");
  const [reasonVisit, setReasonVisit] = useState(record?.reasonVisit ?? "");
  const [treatmentMade, setTreatmentMade] = useState(record?.treatmentMade ?? "");
  const [doctor, setDoctor] = useState(record?.doctor?.id ?? "");
  const [doctors, setDoctors] = useState<DoctorDTO[]>([]);

  useEffect(() => {
    getListDoctor(0, 1000, "id,asc", {})
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error getting doctors", { variant: "error" });
      });
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const body = {
        date,
        typeVisit,
        reasonVisit,
        treatmentMade,
        patientId: Number(patientId),
        doctor: { id: Number(doctor) },
      };
      setSaveLoading(true);
      if (record?.id) {
        updatePatientRecord(record.id, body)
          .then((response) => {
            enqueueSnackbar("Patient record updated successfully", { variant: "success" });
            navigate(getDetailPath(PATIENTS_PATH, patientId));
          })
          .catch((error) => {
            enqueueSnackbar("Error updating patient record", { variant: "error" });
          })
          .finally(() => {
            setSaveLoading(false);
          });
      } else {
        createPatientRecord(body)
          .then((response) => {
            enqueueSnackbar("Patient record created successfully", { variant: "success" });
            navigate(getDetailPath(PATIENTS_PATH, patientId));
          })
          .catch((error) => {
            enqueueSnackbar("Error creating patient record", { variant: "error" });
          })
          .finally(() => {
            setSaveLoading(false);
          });
      }
    },
    [record, setSaveLoading, date, typeVisit, reasonVisit, treatmentMade, doctor, enqueueSnackbar, navigate, patientId]
  );

  return (
    <Paper sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <DateField
              fullWidth
              label="Date"
              name="date"
              size="small"
              variant="outlined"
              required
              value={date}
              format={DATE_FORMAT}
              onChange={(newDate) => setDate(newDate ?? "")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Type of visit"
              name="typeVisit"
              size="small"
              required
              value={typeVisit}
              onChange={(e) => setTypeVisit(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Reason of visit"
              name="reasonVisit"
              size="small"
              multiline
              rows={3}
              required
              value={reasonVisit}
              onChange={(e) => setReasonVisit(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Treatment made"
              name="treatmentMade"
              size="small"
              multiline
              rows={3}
              required
              value={treatmentMade}
              onChange={(e) => setTreatmentMade(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel required size="small" id="blood-group-label">
                Blood Group
              </InputLabel>
              <Select
                labelId="blood-group-label"
                id="blood-group-select"
                value={String(doctor)}
                label="Blood Group"
                required
                size="small"
                onChange={(e: SelectChangeEvent) => setDoctor(e.target.value)}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={String(doctor.id)}>
                    {doctor.name} {doctor.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} textAlign="right">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" endIcon={<Save />} disabled={saveLoading}>
                Save
              </Button>
              <Button variant="outlined" component={Link} to={getDetailPath(PATIENTS_PATH, patientId)}>
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PatientRecordForm;
