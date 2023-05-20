import { CircularProgress, Grid } from "@mui/material";
import React, { Dispatch, useEffect, useMemo, useReducer, useState } from "react";
import { api } from "../../config/api";
import { Doctor, DoctorFilter } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../Layout/SectionHeader";
import DoctorBox from "./DoctorBox";
import FiltersForm from "./FiltersForm";
import { Action, staffFilterReducer } from "./lib";

const demoDataDoctors: Doctor[] = [
  {
    id: 1,
    name: "Giogio",
    surname: "Vanni",
    phoneNumber: "1234567890",
    email: "giorgioVanni@ho.com",
    lastPatientsVisited: [
      {
        id: 1,
        name: "Mario",
        surname: "Rossi",
      },
      {
        id: 2,
        name: "Luigi",
        surname: "Verdi",
      },
    ],
  },
  {
    id: 2,
    name: "Alessandro",
    surname: "Rossi",
    phoneNumber: "1234567890",
    email: "alessandroRossi@ho.com",
    lastPatientsVisited: [
      {
        id: 3,
        name: "Giovanni",
        surname: "Marroni",
      },
      {
        id: 4,
        name: "Rosa",
        surname: "Giannini",
      },
    ],
  },
];

interface IStaffFilterContext {
  filter: DoctorFilter;
  dispatch: Dispatch<Action>;
}

export const StaffFilterContext: React.Context<IStaffFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const getListDoctor = api.doctors.getListDoctor;

const Staff: React.FC = () => {
  const [filter, dispatch] = useReducer(staffFilterReducer, {});
  const staffContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListDoctor(filter, 0, 100, "id,asc")
      .then((response) => {
        response.data = demoDataDoctors;
        setDoctorsList(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setDoctorsList, setLoading, filter]);

  return (
    <StaffFilterContext.Provider value={staffContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Staff</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="Collegues database" />
      <FiltersForm />
      <Grid container mt={4} spacing={2}>
        {loading ? (
          <Grid direction="row" justifyContent="center" alignItems="center" item>
            <CircularProgress />
          </Grid>
        ) : (
          doctorsList.map((doctor) => (
            <Grid item key={doctor.id} xs={4}>
              <DoctorBox props={{ doctor }} />
            </Grid>
          ))
        )}
      </Grid>
    </StaffFilterContext.Provider>
  );
};

export default Staff;
