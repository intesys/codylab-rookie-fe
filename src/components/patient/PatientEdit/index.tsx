import { CircularProgress, Grid } from "@mui/material";
import useGetDetail from "../../../hooks/useGetDetail";
import { getPath } from "../../../lib/utils";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../../Layout/SectionHeader";
import PatientForm from "../PatientForm";

import React from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../config/api";
import { PATIENTS_PATH } from "../../../config/paths";
import { PatientDTO } from "../../../generated/axios";

const emptyRecord = {};
const getPatient = api.patients.getPatient;

const PatientEdit = () => {
  const { id } = useParams();
  const [patient, loading] = useGetDetail(getPatient, emptyRecord as PatientDTO, Number(id));

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
