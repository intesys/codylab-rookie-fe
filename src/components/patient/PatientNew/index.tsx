import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/Layout/SectionHeader";
import PatientForm from "@components/Patient/PatientForm";
import { PATIENTS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const emptyRecord = {};

const PatientNew = () => {
  return (
    <React.Fragment>
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
          <PatientForm record={emptyRecord} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PatientNew;
