import { CircularProgress, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Dispatch, useEffect, useMemo, useReducer, useState } from "react";
import { api } from "../../config/api";
import { DoctorDTO, DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import SectionHeader from "../Layout/SectionHeader";
import DoctorBox from "./DoctorBox";
import FiltersForm from "./FiltersForm";
import { Action, doctorsFilterReducer } from "./lib";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const getListDoctor = api.doctors.getListDoctor;

const Doctors: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [doctorsList, setDoctorsList] = useState<DoctorDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListDoctor(0, 100, "id,asc", filter)
      .then((response) => {
        setDoctorsList(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setDoctorsList, setLoading, filter]);

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="Doctors database" />
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
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
