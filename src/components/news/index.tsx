import React from "react";
import BreadcrumbEl from "../Breadcumb/BreadcrumbEl";
import Breadcrumb from "../Breadcumb/breadcrumb";

const News: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl active>News</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default News;
