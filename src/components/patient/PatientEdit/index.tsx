import { CircularProgress, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../config/api";
import { PATIENTS_PATH } from "../../../config/paths";
import { PatientDTO } from "../../../generated/axios";
import { getPath } from "../../../lib/utils";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../../Layout/SectionHeader";
import PatientForm from "../PatientForm";

const getPatient = api.patients.getPatient;

const PatientEdit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<PatientDTO>({});
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getPatient(Number(id))
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setPatient, setLoading, id]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="Edit patient" />
        </Grid>
        <Grid item xs={12}>
          {loading ? <CircularProgress /> : <PatientForm record={patient} />}
        </Grid>
      </Grid>
    </>
  );
};

export default PatientEdit;
