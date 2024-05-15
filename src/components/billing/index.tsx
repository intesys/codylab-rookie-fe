import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React from "react";

const Billing: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl active>Billing</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default Billing;
