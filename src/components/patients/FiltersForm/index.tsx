import { PatientsFilterContext } from "@components/Patients";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useCallback, useContext, useState } from "react";

const FiltersForm: FC = () => {
  const [pid, setPid] = useState("");
  const [opd, setOpd] = useState("");
  const [idp, setIdp] = useState("");
  const { dispatch } = useContext(PatientsFilterContext);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filter = {
        ...(pid && { id: Number(pid) }),
        ...(opd && { opd: Number(opd) }),
        ...(idp && { idp: Number(idp) }),
      };
      dispatch({ type: "SET_FILTER", payload: filter });
    },
    [pid, opd, idp]
  );

  return (
    <Paper sx={{ padding: 4 }}>
      <form autoComplete="off" onSubmit={handleSubmit} data-cy="patient-filter-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="flex-end">
              <Typography variant="h6" mr={3} textTransform="uppercase">
                Find a patient
              </Typography>
              <Typography variant="caption">Insert the information of patient</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Patient ID (PID)"
              onChange={(e) => setPid(e.target.value)}
              variant="outlined"
              type="number"
              size="small"
              name="pid"
              fullWidth
              value={pid}
              data-cy="patient-filter-pid"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Outpatient Number (OPD)"
              onChange={(e) => setOpd(e.target.value)}
              variant="outlined"
              type="number"
              size="small"
              name="opd"
              fullWidth
              value={opd}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Inpatient Number (IDP)"
              onChange={(e) => setIdp(e.target.value)}
              variant="outlined"
              type="number"
              size="small"
              name="idp"
              fullWidth
              value={idp}
            />
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="outlined" type="submit" endIcon={<SearchIcon />}>
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FiltersForm;
