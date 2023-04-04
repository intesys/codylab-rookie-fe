import { Button, Grid } from "@mui/material";
import React from "react";
import { IMaterialItem } from "./Types";

const MaterialItem: React.FC<IMaterialItem> = ({
  name,
  alert,
  quantity,
  weeksForRefueling,
}) => (
  <section className="drug_list__item">
    <Grid container spacing={4}>
      <Grid item xs={alert ? 6 : 12}>
        <h3>{name}</h3>
      </Grid>
      {alert && (
        <Grid item xs={6}>
          <h3>{alert}</h3>
        </Grid>
      )}
    </Grid>
    <Grid
      container
      flexDirection="row"
      alignItems="flex-end"
      alignContent="center"
      textAlign="center"
      spacing={4}
    >
      <Grid item xs={4}>
        <div className="drug_list__item__quantity">{quantity}</div>
        <div className="drug_list__item__caption">Vials remaining</div>
      </Grid>
      <Grid item xs={4}>
        <div className="drug_list__item__quantity">{weeksForRefueling}</div>
        <div className="drug_list__item__caption">
          weeks for the next refueling
        </div>
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined">Go to details</Button>
      </Grid>
    </Grid>
  </section>
);

export default MaterialItem;
