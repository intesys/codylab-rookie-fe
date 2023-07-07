import React from "react";
import Breadcrumb from "../Breadcrumb/breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";

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
