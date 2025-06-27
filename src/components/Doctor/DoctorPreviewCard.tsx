import React from "react";
import { Link } from "react-router-dom";
import { DoctorDTO } from "../../generated/axios";

const DoctorPreviewCard: React.FC<{ doctor: DoctorDTO }> = ({ doctor }) => (
  <div className="doctor-card">
    <div>
      <strong>
        {doctor.name} {doctor.surname}
      </strong>
      <div>{doctor.profession}</div>
    </div>
    <Link to={`/doctors/${doctor.id}`}>Dettagli</Link>
  </div>
);

export default DoctorPreviewCard;
