import { Button, Grid } from "@mui/material";
import React from "react";
import { IMaterialItem } from "./Types";

const MaterialItem: React.FC<IMaterialItem> = (props) => (
  <section className="drug_list__item">
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <h3>{props.name}</h3>
      </Grid>
    </Grid>
    <Grid container spacing={4}>
      <Grid item xs={4} alignItems="center" className="cell--center">
        <div className="drug_list__item__quantity">{props.quantity}</div>
        <div className="drug_list__item__caption">Vials remaining</div>
      </Grid>
      <Grid item xs={4} alignItems="center" className="cell--center">
        <div className="drug_list__item__quantity">
          {props.weeksForRefueling}
        </div>
        <div className="drug_list__item__caption">
          weeks for the next refueling
        </div>
      </Grid>
      <Grid item xs={4} alignItems="center" className="cell--center">
        <Button>Go to details</Button>
      </Grid>
    </Grid>
  </section>
);

export default MaterialItem;
