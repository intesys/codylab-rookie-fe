import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";

const Ward: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl active>Ward</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default Ward;
