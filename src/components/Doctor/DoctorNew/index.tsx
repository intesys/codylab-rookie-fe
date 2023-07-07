import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DOCTORS_PATH } from "../../../config/paths";
import { getPath } from "../../../lib/utils";
import Breadcrumb from "../../Breadcrumb/breadcrumb";
import BreadcrumbEl from "../../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../../Layout/SectionHeader";
import DoctorForm from "../DoctorForm/Index";

const emptyRecord = {};

const DoctorNew = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="New doctor" />
        </Grid>
        <Grid item xs={12}>
          <DoctorForm record={emptyRecord} />
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorNew;
