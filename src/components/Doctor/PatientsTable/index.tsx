import { ArrowForwardIos } from "@mui/icons-material";
import {
  CircularProgress,
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
import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/api";
import { PATIENTS_PATH } from "../../../config/paths";
import { DoctorDTO } from "../../../generated/axios";
import useGetList from "../../../hooks/useGetList";
import { getDetailPath } from "../../../lib/utils";

const getListPatient = api.patients.getListPatient;

interface IProps extends React.PropsWithChildren {
  doctor: DoctorDTO;
}

const PatientsTable: FC<IProps> = ({ doctor }) => {
  const navigate = useNavigate();
  const filters = useMemo(() => ({ doctorId: doctor.id }), [doctor]);

  const [patientList, loading] = useGetList(getListPatient, filters);

  return (
    <Paper>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
              Patients
            </Typography>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PID</TableCell>
                  <TableCell align="right">OPD</TableCell>
                  <TableCell align="right">IDP</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Surname</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientList && patientList.length > 0 ? (
                  patientList.map((row) => (
                    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.opd}</TableCell>
                      <TableCell align="right">{row.idp}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.surname}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => navigate(getDetailPath(PATIENTS_PATH, row.id))}>
                          <ArrowForwardIos />
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
        </>
      )}
    </Paper>
  );
};

export default PatientsTable;
