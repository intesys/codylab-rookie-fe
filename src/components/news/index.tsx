import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React from "react";

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
