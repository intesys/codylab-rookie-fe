import { Save } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { PATIENTS_PATH } from "../../../config/paths";
import { Patient } from "../../../generated/axios";
import { bloodTypeOptions } from "../../../lib/options";
import { getPath } from "../../../lib/utils";

interface IProps extends React.PropsWithChildren {
  record?: Patient;
}

const PatientForm: FC<IProps> = ({ record }) => {
  return (
    <Paper sx={{ p: 4 }}>
      <form>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              size="small"
              required
              value={record?.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Surname"
              name="surname"
              size="small"
              required
              value={record?.surname}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              size="small"
              required
              value={record?.address}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="OPD"
              name="opd"
              size="small"
              type="number"
              required
              value={record?.opd}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="IDP"
              name="idp"
              size="small"
              type="number"
              required
              value={record?.idp}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel required size="small" id="demo-simple-select-label">
                Blood Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={record?.bloodGroup}
                label="Blood Group"
                required
                size="small"
                onChange={() => {}}
              >
                {bloodTypeOptions()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <FormControl>
              <FormGroup>
                <FormControlLabel control={<Switch />} label="Chronic patient" />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              size="small"
              rows={4}
              multiline
              value={record?.notes}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} textAlign="right">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" endIcon={<Save />}>
                Save
              </Button>
              <Button variant="outlined" component={Link} to={getPath(PATIENTS_PATH)}>
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PatientForm;
