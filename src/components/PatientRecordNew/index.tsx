import { doctorsFilterReducer } from "@components/Doctors/lib";
import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import { api } from "@config/api";
import { DATE_FORMAT } from "@config/date";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const doctorListApi = api.doctors.getListDoctor;

const PatientRecordNew: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientDTO>();
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});

  const [date, setDate] = useState();
  const [typeVisit, setTypeVisit] = useState("");
  const [doctor, setDoctor] = useState();
  const [reasonVisit, setReasonVisit] = useState("");
  const [treatmentMade, setTreatmentMade] = useState("");
  const [doctors, loading2] = useGetList(doctorListApi, filter);

  const navigate = useNavigate();
  const { id } = useParams();
  const patientId = Number(id);
  useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response) => {
      setPatient(response.data);
    });
    setLoading(false);
  }, [loading, id]);
  if (!patient) {
    return <>Patient not found</>;
  }

  const handleBackButton = () => {
    navigate(getDetailPath(PATIENTS_PATH, id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api.patientRecords
      .createPatientRecord({ date, typeVisit, doctor, reasonVisit, treatmentMade, patientId })
      .then(() => {
        enqueueSnackbar("Patient Record created successfully!", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      });
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>
            {patient.name} {patient.surname}
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New record</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        <b style={{ textTransform: "uppercase" }}>
          {patient.name} {patient.surname}: NEW PATIENT RECORD
        </b>
      </Typography>
      <div className="box">
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <DatePicker defaultValue={dayjs()} format={DATE_FORMAT} onChange={(e) => setDate(e)} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Type of visit"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) => setTypeVisit(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-address"
                  label="Doctor"
                  required
                  size="small"
                  select
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor} value={doctor}>
                      {doctor.name} {doctor.surname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-idp"
                  label="Reason of visit"
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setReasonVisit(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-opd"
                  label="Treatment Made"
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setTreatmentMade(e.target.value)}
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
export default PatientRecordNew;
