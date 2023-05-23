import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../config/api";
import { PATIENTS_PATH } from "../../../config/paths";
import { PatientDTO } from "../../../generated/axios";
import { getDetailPath, getPath } from "../../../lib/utils";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../../Layout/SectionHeader";
import PatientRecordForm from "../PatientRecordForm";

const getPatient = api.patients.getPatient;

const PatientRecordNew = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientDTO>({});

  useEffect(() => {
    getPatient(Number(id))
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      });
  }, [setPatient, id]);

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
        <BreadcrumbEl active>New record</BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title={`${patient.name} ${patient.surname}: new patient record`} />
        </Grid>
        <Grid item xs={12}>
          <PatientRecordForm record={{}} patientId={id} />
        </Grid>
      </Grid>
    </>
  );
};

export default PatientRecordNew;
