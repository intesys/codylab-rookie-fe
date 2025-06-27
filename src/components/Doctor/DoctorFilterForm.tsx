import React, { useState } from "react";

const DoctorFilterForm: React.FC<{ onFilter: (criteria: any) => void }> = ({ onFilter }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFilter({ name });
      }}
    >
      <input placeholder="Nome dottore" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Filtra</button>
    </form>
  );
};

export default DoctorFilterForm;
