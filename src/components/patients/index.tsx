import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PatientFilterDTO } from "@generated/axios";
import { useGetList } from "@hooks/useGetList";
import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import { Box, Button, TextField } from "@mui/material";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Action, patientsFilterReducer } from "./lib";

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const patientListApi = api.patients.getListPatient;

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patients, loading] = useGetList(patientListApi, filter);
  const [pid, setPid] = useState(Number());
  const [opd, setOpd] = useState(Number());
  const [idp, setIdp] = useState(Number());

  const navigate = useNavigate();

  const handlePatientClick = (id: number) => {
    navigate(`/patients/${id}`);
  };

  const handlAddNewDoctorClick = () => {
    navigate(`/patients/new`);
  };

  const handleSubmitClick = () => {
    const newFilter = {} as PatientFilterDTO;
    if (pid) newFilter.id = pid;
    if (opd) newFilter.opd = opd;
    if (idp) newFilter.idp = idp;
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>
      <div className="header">
        <h3 className="titolo">PATIENT DATABASE</h3>
        <Button variant="outlined" onClick={() => handlAddNewDoctorClick()}>
          + ADD NEW PATIENT
        </Button>
      </div>
      <div className="form">
        <div className="form-title">
          <h3 className="title_form-title">FIND A PATIENT</h3>
          <p className="subtitle_form-title">Insert the information of patient</p>
        </div>
        <Box
          sx={{
            columnGap: 2,
            display: "grid",
            gridTemplateColumns: "repeat(13, 1fr)",
            gridTemplateAreas: `"pid pid pid opd opd opd idp idp idp idp idp search search search search search"`,
          }}
        >
          <TextField
            sx={{ gridArea: "pid" }}
            id="outlined-basic"
            label="Patient ID (PID)"
            variant="outlined"
            size="small"
            onChange={(e) => setPid(Number(e.target.value))}
          />

          <TextField
            sx={{ gridArea: "opd" }}
            id="outlined-basic"
            label="Uotpatient Number (OPD)"
            variant="outlined"
            size="small"
            onChange={(e) => setOpd(Number(e.target.value))}
          />

          <TextField
            sx={{ gridRow: "1", gridColumn: "span 2", gridArea: "idp" }}
            id="outlined-basic"
            label="Inpatient Number (IDP)"
            variant="outlined"
            size="small"
            onChange={(e) => setIdp(Number(e.target.value))}
          />
          <Button sx={{ gridArea: "search" }} variant="outlined" onClick={() => handleSubmitClick()}>
            Search
            <img width="22" height="22" src="https://img.icons8.com/sf-regular/48/FA5252/search.png" alt="search--v1" />
          </Button>
        </Box>
      </div>
      <br />
      <br />
      <Box sx={{ columnGap: 3, rowGap: 4, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {patients.map((patient) => (
          <div
            className="box-doctor"
            key={patient.id}
            onClick={() => handlePatientClick(patient.id ?? 0)}
            style={{
              cursor: "pointer",
            }}
          >
            <div className="box-info">
              <p className="name">
                <strong>
                  {patient.name} {patient.surname}
                </strong>
              </p>
              <p className="patient-info">
                PID: <strong>{patient.id}</strong> | OPD: <strong>{patient.opd}</strong> | IDP:{" "}
                <strong>{patient.id}</strong>
              </p>
              <div className="avatar">
                <img src={generateAvatarImage(DetailType.PATIENT, patient.id)} alt="" />
              </div>
            </div>
          </div>
        ))}
      </Box>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
