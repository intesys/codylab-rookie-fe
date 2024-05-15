import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React from "react";

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
