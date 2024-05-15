import { api } from "@config/api";
import { DATE_FORMAT } from "@config/date";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { getNewRecordDetailPath } from "@lib/utils";
import { DeleteOutline } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";

const deletePatientRecord = api.patientRecords.deletePatientRecord;

interface IProps extends React.PropsWithChildren {
  patient: PatientDTO;
}

const RecordTable: FC<IProps> = ({ patient }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [patientRecords, setSetPatientRecords] = useState(patient?.patientRecords);

  const deleteHandle = useCallback(
    (id: number) => {
      deletePatientRecord(id)
        .then(() => {
          setSetPatientRecords(patientRecords?.filter((record) => record.id !== id));
          enqueueSnackbar("Patient record deleted successfully", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        });
    },
    [patientRecords]
  );

  return (
    <Paper>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          Records
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          component={Link}
          to={getNewRecordDetailPath(PATIENTS_PATH, patient?.id)}
        >
          record
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Type of</TableCell>
              <TableCell align="right">Reason</TableCell>
              <TableCell align="right">Treatment made</TableCell>
              <TableCell align="right">Doctor</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientRecords && patientRecords.length > 0 ? (
              patientRecords.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {dayjs(row.date).format(DATE_FORMAT)}
                  </TableCell>
                  <TableCell align="right">{row.typeVisit}</TableCell>
                  <TableCell align="right">{row.reasonVisit}</TableCell>
                  <TableCell align="right">{row.treatmentMade}</TableCell>
                  <TableCell align="right">
                    {row.doctor?.name} {row.doctor?.surname}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => deleteHandle(Number(row.id))}>
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={"noRecord"} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" colSpan={5}>
                  No records
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecordTable;
