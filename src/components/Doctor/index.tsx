import React from "react";
import { Link } from "react-router-dom";
import { DOCTORS_PATH } from "../../config/paths";
import { getPath } from "../../lib/utils";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";

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
