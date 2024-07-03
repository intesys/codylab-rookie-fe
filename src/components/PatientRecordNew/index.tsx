import { doctorsFilterReducer } from "@components/Doctors/lib";
import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
import Breadcrumb from "@components/breadcrumb/breadcrumb";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
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
    </div>
  );
};
export default PatientRecordNew;
