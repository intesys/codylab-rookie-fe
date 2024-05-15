import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import DoctorBox from "@components/Doctors/DoctorBox";
import FiltersForm from "@components/Doctors/FiltersForm";
import { Action, doctorsFilterReducer } from "@components/Doctors/lib";
import SectionHeader from "@components/Layout/SectionHeader";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getNewDetailPath } from "@lib/utils";
import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { Link } from "react-router-dom";

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
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [doctorList, loading] = useGetList(getListDoctor, filter);

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="Doctors database">
        <Button component={Link} to={getNewDetailPath(DOCTORS_PATH)} variant="outlined" startIcon={<Add />}>
          Add new doctor
        </Button>
      </SectionHeader>
      <FiltersForm />
      <Grid container mt={4} spacing={2}>
        {loading ? (
          <Grid xs={12} item justifyContent="center" alignItems="center" textAlign="center">
            <CircularProgress />
          </Grid>
        ) : (
          doctorList.map((doctor) => (
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
