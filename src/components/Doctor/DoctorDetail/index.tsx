import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getPath } from "@lib/utils";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";

const DoctorDetail: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.doctors.getDoctor(Number(id)).then((response) => {
      setDoctor(response.data);
    });
    setLoading(false);
  }, [loading, id]);

  if (!doctor) {
    return <>Doctor not found</>;
  }
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTOR DETAILS" />
      <Paper>
        <Grid container rowSpacing={2} columnSpacing={2} alignItems="center">
          <Grid item>
            <Avatar src={generateAvatarImage(DetailType.DOCTOR, doctor.id)} sx={{ height: 100, width: 100 }} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5">
              {doctor.name} <b>{doctor.surname}</b>
              <br />
              <Typography variant="body1">{doctor.profession}</Typography>
            </Typography>
          </Grid>
          <EditIcon className="editIcon" />
        </Grid>
      </Paper>
    </div>
  );
};

export default DoctorDetail;
