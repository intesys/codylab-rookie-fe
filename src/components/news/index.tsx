import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";

const News: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>News</BreadcrumbEl>
      </Breadcrumb>
    </div>
  );
};

export default News;
