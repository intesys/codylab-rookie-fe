import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";

const Patient: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>Patients</BreadcrumbEl>
        <BreadcrumbEl active>Name</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default Patient;
