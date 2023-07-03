import React from "react";

export interface IBreadcrumbEl extends React.PropsWithChildren {
  active?: boolean;
}

const BreadcrumbEl: React.FC<IBreadcrumbEl> = ({ active, children }) => {
  const activeClass = active && "breadcrumb_el--active";
  const className = ["breadcrumb_el", activeClass].join(" ");
  return <li className={className}>{children}</li>;
};

export default BreadcrumbEl;
