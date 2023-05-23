import { Save } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../config/api";
import { PATIENTS_PATH } from "../../../config/paths";
import { PatientDTO, PatientDTOBloodGroupEnum } from "../../../generated/axios";
import { getBloodType, getDetailPath, getPath } from "../../../lib/utils";

const createPatient = api.patients.createPatient;
const updatePatient = api.patients.updatePatient;

interface IProps extends React.PropsWithChildren {
  record: PatientDTO;
}

const PatientForm: FC<IProps> = ({ record }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [saveLoading, setSaveLoading] = useState(false);
  const [name, setName] = useState(record?.name ?? "");
  const [surname, setSurname] = useState(record?.surname ?? "");
  const [address, setAddress] = useState(record?.address ?? "");
  const [opd, setOpd] = useState(record?.opd);
  const [idp, setIdp] = useState(record?.idp);
  const [bloodGroup, setBloodGroup] = useState<PatientDTOBloodGroupEnum | undefined>(record?.bloodGroup);
  const [chronicPatient, setChronicPatient] = useState(record?.chronicPatient ?? false);
  const [notes, setNotes] = useState(record?.notes);

  const backPath = useMemo(
    () => (record.id ? getDetailPath(PATIENTS_PATH, record.id) : getPath(PATIENTS_PATH)),
    [record]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const body = {
        name,
        surname,
        address,
        opd,
        idp,
        bloodGroup,
        chronicPatient,
        notes,
      };
      setSaveLoading(true);
      if (record?.id) {
        updatePatient(record.id, body)
          .then((response) => {
            enqueueSnackbar("Patient updated successfully", { variant: "success" });
            navigate(getDetailPath(PATIENTS_PATH, record.id));
          })
          .catch((error) => {
            enqueueSnackbar("Error updating patient", { variant: "error" });
          })
          .finally(() => {
            setSaveLoading(false);
          });
      } else {
        createPatient(body)
          .then((response) => {
            enqueueSnackbar("Patient created successfully", { variant: "success" });
            navigate(getDetailPath(PATIENTS_PATH, response.data.id));
          })
          .catch((error) => {
            enqueueSnackbar("Error creating patient", { variant: "error" });
          })
          .finally(() => {
            setSaveLoading(false);
          });
      }
    },
    [name, surname, address, opd, idp, bloodGroup, chronicPatient, notes, record, setSaveLoading]
  );

  return (
    <Paper sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              size="small"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              value={opd}
              onChange={(e) => setOpd(Number(e.target.value))}
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
              value={idp}
              onChange={(e) => setIdp(Number(e.target.value))}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel required size="small" id="blood-group-label">
                Blood Group
              </InputLabel>
              <Select
                labelId="blood-group-label"
                id="blood-group-select"
                value={bloodGroup}
                label="Blood Group"
                required
                size="small"
                onChange={(e: SelectChangeEvent) => setBloodGroup(e.target.value as PatientDTOBloodGroupEnum)}
              >
                <MenuItem value={PatientDTOBloodGroupEnum.APlus}>
                  {getBloodType(PatientDTOBloodGroupEnum.APlus)}
                </MenuItem>
                <MenuItem value={PatientDTOBloodGroupEnum.BMinus}>
                  {getBloodType(PatientDTOBloodGroupEnum.BMinus)}
                </MenuItem>
                <MenuItem value={PatientDTOBloodGroupEnum.BPlus}>
                  {getBloodType(PatientDTOBloodGroupEnum.BPlus)}
                </MenuItem>
                <MenuItem value={PatientDTOBloodGroupEnum.AbMinus}>
                  {getBloodType(PatientDTOBloodGroupEnum.AbMinus)}
                </MenuItem>
                <MenuItem value={PatientDTOBloodGroupEnum.AbPlus}>
                  {getBloodType(PatientDTOBloodGroupEnum.AbPlus)}
                </MenuItem>
                <MenuItem value={PatientDTOBloodGroupEnum.ZeroMinus}>
                  {getBloodType(PatientDTOBloodGroupEnum.ZeroMinus)}
                </MenuItem>
                <MenuItem value={PatientDTOBloodGroupEnum.ZeroPlus}>
                  {getBloodType(PatientDTOBloodGroupEnum.ZeroPlus)}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChronicPatient(e.target.checked)}
                    />
                  }
                  label="Chronic patient"
                />
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
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} textAlign="right">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" endIcon={<Save />} disabled={saveLoading}>
                Save
              </Button>
              <Button variant="outlined" component={Link} to={backPath}>
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
