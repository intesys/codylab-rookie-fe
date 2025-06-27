import { api } from "@config/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorDTO } from "../../generated/axios";

const DoctorDetail: React.FC = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<DoctorDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.doctors
      .getDoctor(Number(id))
      .then((res) => setDoctor(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div style={{ padding: 32 }}>
      <h2>
        {doctor.name} {doctor.surname}
      </h2>
      <div>Professione: {doctor.profession}</div>
      <div>Email: {doctor.email}</div>
      {/* Qui puoi aggiungere la lista pazienti assegnati */}
    </div>
  );
};

export default DoctorDetail;
