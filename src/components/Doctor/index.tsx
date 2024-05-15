import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import React from "react";
import { Link } from "react-router-dom";

const Doctor: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{/* Doctor name and surname */}</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default Doctor;
