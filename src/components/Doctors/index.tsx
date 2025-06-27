import { api } from "@config/api";
import { DoctorDTO } from "@generated/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.doctors
      .getListDoctor(0, 50, "id,asc", {})
      .then((res) => setDoctors(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!doctors.length) return <div>No doctors found</div>;

  return (
    <div style={{ padding: 32 }}>
      <h2>Doctors Database</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <Link to={`/doctors/${doctor.id}`}>
              {doctor.name} {doctor.surname}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
