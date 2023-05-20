import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../config/api";
import { PATIENTS_PATH } from "../../config/paths";
import { PatientFilter, Patient as PatientType } from "../../generated/axios";
import { getNewDetailPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../Layout/SectionHeader";
import FiltersForm from "./FiltersForm";
import PatientBox from "./PatientBox";
import { Action, patientsFilterReducer } from "./lib";

const demoDataPatients: PatientType[] = [
  {
    id: 1,
    opd: 232,
    name: "Giogio",
    surname: "Vanni",
    email: "giorgioVanni@ho.com",
    lastAdmission: "2021-01-10T00:00:00.000+00:00",
    patientRecords: [
      {
        id: 1,
        reasonVisit: "Stomachache",
        date: new Date().toISOString(),
        treatmentMade: "Gave him some pills", // DEVE DIVENTARE UNA STRINGA
        // deve essere aggiunte tutte le info del medico
        doctor: {
          id: 1,
          name: "Giogio",
          surname: "Vanni",
          phoneNumber: "1234567890",
          email: "giorgioVanni@ho.com",
        },
      },
    ],
  },
  {
    id: 2,
    opd: 2626,
    name: "Giogio",
    surname: "Vanni",
    email: "giorgioVanni@ho.com",
    lastAdmission: "2021-01-10T00:00:00.000+00:00",
    patientRecords: [
      {
        id: 2,
        reasonVisit: "Stomachache",
        date: new Date().toISOString(),
        treatmentMade: "Gave him some pills", // DEVE DIVENTARE UNA STRINGA
        // deve essere aggiunte tutte le info del medico
        doctor: {
          id: 2,
          name: "Giogio",
          surname: "Vanni",
          phoneNumber: "1234567890",
          email: "giorgioVanni@ho.com",
        },
      },
    ],
  },
];

interface IPatientsFilterContext {
  filter: PatientFilter;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const getPatientList = api.patients.getListPatient;

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patientList, setPatientList] = useState<PatientType[]>(demoDataPatients);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   getPatientList(filter, 0, 100, "id,asc")
  //     .then((response) => {
  //       response.data = demoDataPatients;
  //       setPatientList(response.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [setPatientList, setLoading, filter]);

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl>Patients</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="Patients database">
        <Button component={Link} to={getNewDetailPath(PATIENTS_PATH)} variant="outlined" startIcon={<Add />}>
          Add new patient
        </Button>
      </SectionHeader>
      <FiltersForm />
      <Grid container mt={4} spacing={2}>
        {loading ? (
          <Grid direction="row" justifyContent="center" alignItems="center" item>
            <CircularProgress />
          </Grid>
        ) : (
          patientList.map((patient) => (
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
