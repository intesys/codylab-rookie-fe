<<<<<<< HEAD
import React, { Dispatch, useMemo, useReducer } from "react";
import { DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "./lib";
=======
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
>>>>>>> 89e314f (Update tsconfig with alias and refactoring som part of application)

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

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      {/* Doctors filter form */}
      {/* Doctors list */}
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
