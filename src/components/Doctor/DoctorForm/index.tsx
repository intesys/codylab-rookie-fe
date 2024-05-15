import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { EMAIL_VALIDATION_REGEX } from "@config/regex";
import { DoctorDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
import { Save } from "@mui/icons-material";
import { Button, Grid, Paper, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const createDoctor = api.doctors.createDoctor;
const updateDoctor = api.doctors.updateDoctor;

interface IProps extends React.PropsWithChildren {
  record: DoctorDTO;
}

const DoctorForm: FC<IProps> = ({ record }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [saveLoading, setSaveLoading] = useState(false);
  const [name, setName] = useState(record?.name ?? "");
  const [surname, setSurname] = useState(record?.surname ?? "");
  const [profession, setProfession] = useState(record?.profession ?? "");
  const [phoneNumber, setPhoneNumber] = useState(record?.phoneNumber ?? "");
  const [email, setEmail] = useState(record?.email ?? "");
  const [emailError, setError] = useState(false);

  const backPath = useMemo(
    () => (record.id ? getDetailPath(DOCTORS_PATH, record.id) : getPath(DOCTORS_PATH)),
    [record]
  );

  useEffect(() => {
    setError(email !== "" && !EMAIL_VALIDATION_REGEX.test(email));
  }, [email]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const body = {
        name,
        surname,
        profession,
        phoneNumber,
        email,
      };
      setSaveLoading(true);
      if (record?.id) {
        updateDoctor(record.id, body)
          .then((response) => {
            enqueueSnackbar("Doctor updated successfully", { variant: "success" });
            navigate(getDetailPath(DOCTORS_PATH, record.id));
          })
          .catch((error) => {
            enqueueSnackbar("Error updating doctor", { variant: "error" });
          })
          .finally(() => {
            setSaveLoading(false);
          });
      } else {
        createDoctor(body)
          .then((response) => {
            enqueueSnackbar("Doctor created successfully", { variant: "success" });
            navigate(getDetailPath(DOCTORS_PATH, response.data.id));
          })
          .catch((error) => {
            enqueueSnackbar("Error creating doctor", { variant: "error" });
          })
          .finally(() => {
            setSaveLoading(false);
          });
      }
    },
    [name, surname, profession, phoneNumber, email, record, setSaveLoading]
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
              label="Profession"
              name="profession"
              size="small"
              required
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              size="small"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              error={emailError}
              helperText={emailError && "Email is invalid"}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Phone number"
              name="phoneNumber"
              size="small"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}></Grid>
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

export default DoctorForm;
