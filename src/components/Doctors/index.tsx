import React, { Dispatch, useMemo, useReducer } from "react";
import { DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import DoctorList from "../Doctors/doctorList";
import { Action, doctorsFilterReducer } from "./lib";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  // Dati finti per testare la lista
  const fakeDoctors = [
    {
      id: 1,
      name: "Mario",
      surname: "Rossi",
      email: "mario.rossi@example.com",
      phoneNumber: "1234567890",
      avatar: "",
      profession: "Cardiologo",
    },
    {
      id: 2,
      name: "Anna",
      surname: "Bianchi",
      email: "anna.bianchi@example.com",
      phoneNumber: "0987654321",
      avatar: "",
      profession: "Neurologa",
    },
  ];

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>

      {/* Qui puoi aggiungere il form per il filtro più avanti */}

      {/* Lista dei dottori */}
      <DoctorList doctors={fakeDoctors} />
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
