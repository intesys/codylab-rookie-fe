import React from "react";
import BreadcrumbEl from "../Breadcumb/BreadcrumbEl";
import Breadcrumb from "../Breadcumb/breadcrumb";

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
