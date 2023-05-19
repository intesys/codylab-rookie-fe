import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useCallback, useContext, useState } from "react";
import { StaffFilterContext } from "..";

const FiltersForm: FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const { dispatch } = useContext(StaffFilterContext);

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
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="flex-end">
            <Typography variant="h5" mr={3}>
              FIND A COLLEAGUES
            </Typography>
            <Typography variant="caption">Insert the information of your colleagues</Typography>
          </Stack>
        </Grid>
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
            label="Profession/ Specialization"
            onChange={(e) => setProfession(e.target.value)}
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
  );
};

export default FiltersForm;
