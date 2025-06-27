import React from "react";

interface Doctor {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  profession?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "1rem",
        width: 250,
      }}
    >
      <img
        src={doctor.avatar || "/default-avatar.png"}
        alt={`${doctor.name} ${doctor.surname}`}
        style={{ width: "100%", borderRadius: "50%" }}
      />
      <h3>
        {doctor.name} {doctor.surname}
      </h3>
      <p>
        <strong>Email:</strong> {doctor.email}
      </p>
      <p>
        <strong>Telefono:</strong> {doctor.phoneNumber}
      </p>
      <p>
        <strong>Professione:</strong> {doctor.profession}
      </p>
    </div>
  );
};

export default DoctorCard;
