import React, { useState } from "react";

enum BloodGroupEnum {
  APlus = "APlus",
  BPlus = "BPlus",
  AMinus = "AMinus",
  BMinus = "BMinus",
  AbPlus = "AbPlus",
  AbMinus = "AbMinus",
  ZeroPlus = "ZeroPlus",
  ZeroMinus = "ZeroMinus",
}

export default function PatientNew() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    opd: "",
    idp: "",
    bloodGroup: "",
    chronicPatient: false, // booleano
    notes: "", // stringa
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const patientToSend = {
      ...formData,
      opd: Number(formData.opd),
      idp: Number(formData.idp),
    };

    console.log("Dati paziente da inviare:", patientToSend);
    // Qui metti chiamata API per salvare
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuovo Paziente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cognome</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Indirizzo</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">OPD</label>
          <input
            type="number"
            name="opd"
            value={formData.opd}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">IDP</label>
          <input
            type="number"
            name="idp"
            value={formData.idp}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gruppo Sanguigno</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleziona</option>
            {Object.values(BloodGroupEnum).map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox chronicPatient */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="chronicPatient"
            checked={formData.chronicPatient}
            onChange={handleChange}
            id="chronicPatient"
            className="h-4 w-4"
          />
          <label htmlFor="chronicPatient" className="text-sm font-medium">
            Paziente cronico
          </label>
        </div>

        {/* Notes textarea */}
        <div>
          <label className="block text-sm font-medium">Note</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows={4}
            placeholder="Inserisci note aggiuntive"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salva Paziente
        </button>
      </form>
    </div>
  );
}
