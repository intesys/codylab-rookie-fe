import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { FC, useCallback, useContext, useState } from "react";
import { DoctorsFilterContext } from "..";

const DoctorFormFilter: FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const { dispatch } = useContext(DoctorsFilterContext);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filter = {
        ...(name && { name }),
        ...(surname && { surname }),
        ...(profession && { profession }),
      };
      dispatch({ type: "SET_FILTER", payload: filter });
    },
    [name, surname, profession]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          borderRadius: "4px",
          //height: "11vh",
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
              label="Name"
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              value={name}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Surname"
              onChange={(e) => setSurname(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              value={surname}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Specialization"
              onChange={(e) => setProfession(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              value={profession}
            />
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="outlined" type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default DoctorFormFilter;
