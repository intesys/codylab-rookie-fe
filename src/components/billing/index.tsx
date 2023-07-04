import React from "react";
import BreadcrumbEl from "../Breadcumb/BreadcrumbEl";
import Breadcrumb from "../Breadcumb/breadcrumb";

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
