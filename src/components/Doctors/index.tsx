import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { Link } from "react-router-dom";
import { api } from "../../config/api";
import { DOCTORS_PATH } from "../../config/paths";
import { DoctorFilterDTO } from "../../generated/axios";
import useGetList from "../../hooks/useGetList";
import { getNewDetailPath } from "../../lib/utils";
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
          <Grid direction="row" justifyContent="center" alignItems="center" item>
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
