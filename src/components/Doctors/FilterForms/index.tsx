import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useCallback, useContext, useState } from "react";
import { DoctorsFilterContext } from "..";

const FiltersForm: FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfesion] = useState("");
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
    <Paper sx={{ padding: 4 }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack>
              <Typography variant="h6">FIND A DOCTOR</Typography>
              <Typography>Insert the information of doctor</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              value={name}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              value={surname}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              placeholder="Profession"
              onChange={(e) => setProfesion(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              value={profession}
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
