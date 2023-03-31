import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";

const StaffMember: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>Staff</BreadcrumbEl>
        <BreadcrumbEl active>Member</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default StaffMember;
