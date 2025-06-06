import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";

interface IProps extends React.PropsWithChildren {
  title: string;
}

const SectionHeader: FC<IProps> = ({ title, children }) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={6}>
        <Typography component="h1" variant="h6" textTransform="uppercase" data-cy="page-title">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        {children}
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
