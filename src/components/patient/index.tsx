import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import React from "react";
import { Link } from "react-router-dom";

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
