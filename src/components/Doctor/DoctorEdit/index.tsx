import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import DoctorForm from "@components/Doctor/DoctorForm";
import SectionHeader from "@components/Layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getPath } from "@lib/utils";
import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const emptyRecord = {};
const getDoctor = api.doctors.getDoctor;

const DoctorEdit = () => {
  const { id } = useParams();

  const [doctor, loading] = useGetDetail(getDoctor, emptyRecord as DoctorDTO, Number(id));

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title="Edit doctor" />
        </Grid>
        <Grid item xs={12}>
          {loading ? <CircularProgress /> : <DoctorForm record={doctor} />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DoctorEdit;
