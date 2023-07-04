import React from "react";
import { Link } from "react-router-dom";
import { PATIENTS_PATH } from "../../config/paths";
import { getPath } from "../../lib/utils";
import BreadcrumbEl from "../Breadcumb/BreadcrumbEl";
import Breadcrumb from "../Breadcumb/breadcrumb";

const StaffMember: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{/* Patient name and surname */}</BreadcrumbEl>
      </Breadcrumb>
      {/* Patient detail page */}
    </div>
  );
};

export default StaffMember;
