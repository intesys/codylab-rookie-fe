import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DoctorDetail: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorDTO>();

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active></BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="DOCTOR DETAILS" />
      <Paper>
        <Typography variant="h6">FIND DOCTORS</Typography>
      </Paper>
    </div>
  );
};

export default DoctorDetail;
