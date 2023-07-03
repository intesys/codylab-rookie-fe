import React from "react";
import BreadcrumbEl from "../Breadcumb/BreadcrumbEl";
import Breadcrumb from "../Breadcumb/breadcrumb";

const Pharmacy: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl active>Pharmacy</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default Pharmacy;
