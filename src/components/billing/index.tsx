import React from "react";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import Breadcrumb from "../Breadcrumb/breadcrumb";

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
