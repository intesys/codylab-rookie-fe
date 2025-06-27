import React from "react";
import { DoctorDTO } from "../../generated/axios";
import DoctorPreviewCard from "./DoctorPreviewCard";

const DoctorList: React.FC<{ doctors: DoctorDTO[] }> = ({ doctors }) => (
  <div>
    {doctors.map((doctor) => (
      <DoctorPreviewCard doctor={doctor} key={doctor.id} />
    ))}
  </div>
);

export default DoctorList;
