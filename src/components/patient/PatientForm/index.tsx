import { Button, Grid, MenuItem, Paper, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const body = { name, surname, address, opd, idp, bloodGroup, chronicPatient, notes };
      setSaveLoading(true);
      createPatient(body)
        .then((response) => {
          enqueueSnackbar("Patient created successfully", { variant: "success" });
          //navigate(getDetailPath(PATIENTS_PATH, response.data.id));
        })
        .catch((error) => {
          enqueueSnackbar("Error creating patient", { variant: "error" });
        })
        .finally(() => {
          setSaveLoading(false);
        });
    },
    [name, surname, address, opd, idp, bloodGroup, chronicPatient, notes, record, setSaveLoading]
  );

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#FFFFFF" }}>
      <Paper
        elevation={0}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          padding: "16px",
          border: "1px solid #ccc",
          borderBottom: "3px solid #ccc",
        }}
      >
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={4}>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          {/* Surname */}
          <Grid item xs={4}>
            <TextField
              label="Surname"
              variant="outlined"
              size="small"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          {/* Address */}
          <Grid item xs={4}>
            <TextField
              label="Address"
              variant="outlined"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          {/* OPD */}
          <Grid item xs={4}>
            <TextField
              label="Outpatient Number (OPD)"
              variant="outlined"
              type="number"
              size="small"
              value={opd}
              onChange={(e) => setOpd(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
          {/* IDP */}
          <Grid item xs={4}>
            <TextField
              label="Inpatient Number (IDP)"
              variant="outlined"
              size="small"
              value={idp}
              onChange={(e) => setIdp(Number(e.target.value))}
              fullWidth
              type="number"
              required
            />
          </Grid>
          {/* Blood Group */}
          <Grid item xs={4}>
            <Select
              label="Blood Group"
              variant="outlined"
              size="small"
              value={bloodGroup}
              onChange={(e: SelectChangeEvent) => setBloodGroup(e.target.value as PatientDTOBloodGroupEnum)}
              fullWidth
              required
            >
              <MenuItem value={PatientDTOBloodGroupEnum.APlus}>{getBloodType(PatientDTOBloodGroupEnum.APlus)}</MenuItem>
              <MenuItem value={PatientDTOBloodGroupEnum.BMinus}>
                {getBloodType(PatientDTOBloodGroupEnum.BMinus)}
              </MenuItem>
              <MenuItem value={PatientDTOBloodGroupEnum.BPlus}>{getBloodType(PatientDTOBloodGroupEnum.BPlus)}</MenuItem>
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
          </Grid>
          {/* Chronic Patient */}
          <Grid item xs={4}>
            <Typography variant="subtitle1">Chronic Patient</Typography>
            <Switch checked={chronicPatient} onChange={() => setChronicPatient(!chronicPatient)} />
          </Grid>
          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              label="Notes"
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={saveLoading}
              style={{ marginRight: "16px" }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate(backPath)}>
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default PatientForm;
