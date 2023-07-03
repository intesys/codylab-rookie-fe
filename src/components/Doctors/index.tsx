import { Grid } from "@mui/material";
import React, { Dispatch, Reducer } from "react";
import { DoctorDTO, PatientFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import PatientBox from "../Patients/PatientBox";
import { patientsFilterReducer } from "../Patients/lib";
import { Action } from "./lib";

const patientsList: DoctorDTO[] = [
  {
    id: 1,
    name: "Marco",
    surname: "Pietruzzo",
  },
  {
    id: 2,
    name: "Giovanni",
    surname: "Ocneanu",
  },
  {
    id: 3,
    name: "Maria",
    surname: "Antonietta",
  },

  {
    id: 4,
    name: "Jhon",
    surname: "Cena",
  },
];

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const [loading, setLoading] = useState(false);
  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>

      <Grid container mt={4} spacing={2}>
        {loading ? (
          <>Loading</>
        ) : (
          patientsList.map((patient) => (
            <Grid item key={patient.id} xs={4}>
              <PatientBox props={{ patient }} />
            </Grid>
          ))
        )}
      </Grid>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
function useReducer(
  patientsFilterReducer: Reducer<PatientFilterDTO, import("../Patients/lib").Action>,
  arg1: {}
): [any, any] {
  throw new Error("Function not implemented.");
}

function useMemo(arg0: () => { filter: any; dispatch: any }, arg1: any[]) {
  throw new Error("Function not implemented.");
}

function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
