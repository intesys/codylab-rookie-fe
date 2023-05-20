import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";

interface IProps extends React.PropsWithChildren {
  title: string;
}

const SectionHeader: FC<IProps> = ({ title, children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h6" textTransform="uppercase">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
