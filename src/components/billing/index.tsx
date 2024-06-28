/*import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl"; sostituito sta riga */
import React from "react";
import Breadcrumb from "../breadcrumb/breadcrumb";
import BreadcrumbEl from "../breadcrumb/BreadcrumbEl";

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
