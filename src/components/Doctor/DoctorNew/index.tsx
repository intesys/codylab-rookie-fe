import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DOCTORS_PATH } from "../../../config/paths";
import { getPath } from "../../../lib/utils";
import Breadcrumb from "../../../src/components/Breadcumb/breadcrumb";
import BreadcrumbEl from "../../../src/components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "../../../src/components/Layout/SectionHeader";
import DoctorForm from "../../../src/components/Doctor/DoctorForm";

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