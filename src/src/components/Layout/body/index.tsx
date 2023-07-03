import Grid from "@mui/material/Grid";
import React from "react";
import "./index.scss";

interface IProps extends React.PropsWithChildren {}

const Body: React.FC<IProps> = ({ children }) => (
  <div className="layout-body">
    <Grid item xs={12}>
      {children}
    </Grid>
  </div>
);

export default Body;
