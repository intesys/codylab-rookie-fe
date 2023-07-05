import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { FC, useContext, useState } from "react";
import { DoctorsFilterContext } from "..";

const DoctorFormFilter: FC = () => {
  const [pid, setPid] = useState("");
  const [opd, setOpd] = useState("");
  const [idp, setIdp] = useState("");
  const { dispatch } = useContext(DoctorsFilterContext);

  //   const handleSubmit = useCallback(
  //     (event: React.FormEvent<HTMLFormElement>) => {
  //       event.preventDefault();
  //       const filter = {
  //         ...(pid && { id: Number(pid) }),
  //         ...(opd && { opd: Number(opd) }),
  //         ...(idp && { idp: Number(idp) }),
  //       };
  //       dispatch({ type: "SET_FILTER", payload: filter });
  //     },
  //     [pid, opd, idp]
  //   );

  return (
    // <form onSubmit={handleSubmit}>
    <form>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          borderRadius: "4px",
          height: "11vh",
          width: "100%",
          backgroundColor: "#fff",
          padding: "16px",
          border: "1px solid #ccc",
          borderBottom: "3px solid #ccc",
        }}
      >
        <Grid item xs={12} container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h6" style={{ marginLeft: "8px" }} component="div">
              FIND A DOCTOR
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Insert the information of doctor</Typography>
          </Grid>
        </Grid>

        <Grid container item xs={11.8} spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              size="small"
              label="Name"
              variant="outlined"
              type="number"
              onChange={(e) => setPid(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              label="Surname"
              variant="outlined"
              type="number"
              onChange={(e) => setOpd(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              label="Specialization"
              variant="outlined"
              type="number"
              onChange={(e) => setIdp(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={2}>
            <Button variant="outlined" color="primary" type="submit" fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default DoctorFormFilter;
