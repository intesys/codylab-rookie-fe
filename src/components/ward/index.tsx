import Breadcrumb from "@components/breadcrumb/breadcrumb";
import BreadcrumbEl from "@components/breadcrumb/BreadcrumbEl";
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
