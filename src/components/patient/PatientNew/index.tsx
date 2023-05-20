import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { PATIENTS_PATH } from "../../../config/paths";
import { getPath } from "../../../lib/utils";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../../Layout/SectionHeader";
import PatientForm from "../PatientForm";

const PatientNew = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="New patient" />
        </Grid>
        <Grid item xs={12}>
          <PatientForm />
        </Grid>
      </Grid>
    </>
  );
};

export default PatientNew;
