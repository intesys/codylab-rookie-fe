import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { doctorsFilterReducer } from "@components/Doctors/lib";
import { api } from "@config/api";
import { DATE_FORMAT } from "@config/date";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const doctorListApi = api.doctors.getListDoctor;

const PatientRecordNew: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientDTO>();
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});

  const [date, setDate] = useState();
  const [typeVisit, setTypeVisit] = useState();
  const [doctor, setDoctor] = useState();
  const [reasonVisit, setReasonVisit] = useState();
  const [treatmentMade, setTreatmentMade] = useState();
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

  const handleSubmit = () => {
    api.patientRecords.createPatientRecord({ date, typeVisit, doctor, reasonVisit, treatmentMade, patientId });
    navigate(getDetailPath(PATIENTS_PATH, id));
    window.location.reload();
  };
  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>
            {patient.name} {patient.surname}
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New Record</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        <b style={{ textTransform: "uppercase" }}>
          {patient.name} {patient.surname}: NEW PATIENT RECORD
        </b>
      </Typography>
      <Paper className="paper">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                label="Doctor"
                variant="outlined"
                fullWidth
                size="small"
                required
                select
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
                label="Reason of visit"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                required
                onChange={(e) => setReasonVisit(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Treatment made"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                required
                onChange={(e) => setTreatmentMade(e.target.value)}
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
        </form>
      </Paper>
    </>
  );
};

export default PatientRecordNew;
