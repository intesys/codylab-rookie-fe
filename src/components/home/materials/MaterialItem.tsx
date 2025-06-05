import { IMaterialItem } from "@components/Home/Materials/Types";
import { Button, Grid } from "@mui/material";
import React from "react";

const MaterialItem: React.FC<IMaterialItem> = ({ name, alert, quantity, weeksForRefueling }) => (
  <section className="drug_list__item" data-cy="material-item">
    <Grid container spacing={4}>
      <Grid item xs={alert ? 6 : 12}>
        <h3 data-cy="material-name">{name}</h3>
      </Grid>
      {alert && (
        <Grid item xs={6}>
          <h3 data-cy="material-alert">{alert}</h3>
        </Grid>
      )}
    </Grid>
    <Grid
      container
      alignItems="flex-end"
      alignContent="center"
      textAlign="center"
      spacing={4}
      data-cy="material-details"
    >
      <Grid item xs={4}>
        <div className="drug_list__item__quantity" data-cy="material-quantity">
          {quantity}
        </div>
        <div className="drug_list__item__caption">Vials remaining</div>
      </Grid>
      <Grid item xs={4}>
        <div className="drug_list__item__quantity" data-cy="material-refueling-weeks">
          {weeksForRefueling}
        </div>
        <div className="drug_list__item__caption">weeks for the next refueling</div>
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined">Go to details</Button>
      </Grid>
    </Grid>
  </section>
);

export default MaterialItem;
