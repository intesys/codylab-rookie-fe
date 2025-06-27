import { api } from "@config/api";
import React, { useState } from "react";
import { DoctorDTO } from "../../generated/axios";

const DoctorForm: React.FC<{ doctor?: DoctorDTO; onSave: () => void }> = ({ doctor, onSave }) => {
  const [form, setForm] = useState<Partial<DoctorDTO>>(doctor || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = doctor ? api.doctors.updateDoctor(doctor.id, form) : api.doctors.createDoctor(form);
    action.then(onSave);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Nome" />
      <input name="surname" value={form.surname || ""} onChange={handleChange} placeholder="Cognome" />
      {/* altri campi */}
      <button type="submit">Salva</button>
    </form>
  );
};

export default DoctorForm;
