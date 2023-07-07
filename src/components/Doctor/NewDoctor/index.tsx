import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DOCTORS_PATH } from "../../../config/paths";
import { getPath } from "../../../lib/utils";
import Breadcrumb from "../../Breadcumb/breadcrumb";
import BreadcrumbEl from "../../Breadcumb/BreadcrumbEl";

import DoctorForm from "../DoctorForm";
import SectionHeader from "../../Layout/SectionHeader";

const emptyRecord = {};

const DoctorNew = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="New patient" />
        </Grid>
        <Grid item xs={12}>
          <DoctorForm record={emptyRecord} />
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorNew;