import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React from "react";

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
