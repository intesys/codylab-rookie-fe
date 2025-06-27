import { api } from "@config/api";
import React, { useEffect, useState } from "react";
import { DoctorDTO } from "../../generated/axios";
import DoctorFilterForm from "./DoctorFilterForm";
import DoctorList from "./DoctorList";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = (criteria = {}) => {
    setLoading(true);
    api.doctors
      .filterDoctor({
        page: 0,
        size: 50,
        sort: ["id,asc"],
        criteria,
      })
      .then((res) => setDoctors(res.data.content || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Doctors Database</h2>
      <DoctorFilterForm onFilter={fetchDoctors} />
      {loading && <div>Loading...</div>}
      {!loading && !doctors.length && <div>No doctors found</div>}
      {!loading && <DoctorList doctors={doctors} />}
    </div>
  );
};

export default Doctors;
