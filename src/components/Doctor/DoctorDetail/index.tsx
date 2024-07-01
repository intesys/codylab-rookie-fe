import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "@components/Doctors/lib";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorFilterDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
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

const DoctorDetail: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{getDetailPath(DOCTORS_PATH)}</BreadcrumbEl>
      </Breadcrumb>
      <div>
        <h1>test</h1>
        <h2>test</h2>
      </div>
    </DoctorsFilterContext.Provider>
  );
};

export default DoctorDetail;
