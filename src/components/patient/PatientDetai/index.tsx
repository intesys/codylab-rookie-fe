import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import SectionHeader from "@components/layout/SectionHeader";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getBloodType, getEditDetailPath, getPath } from "@lib/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PatientDetail: React.FC = () => {
  const [patient, setPatient] = useState<PatientDTO>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      return;
    }
    api.patients.getPatient(Number(id)).then((response) => {
      setPatient(response.data);
    });
    setLoading(false);
  }, [loading, id]);

  if (!patient) {
    return <>Patient not found</>;
  }

  const handleEditClick = (id: string) => {
    navigate(getEditDetailPath(PATIENTS_PATH, id));
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient.name} {patient.surname}
        </BreadcrumbEl>
      </Breadcrumb>
      <SectionHeader title="PATIENT DETAILS">
        <Button variant="outlined">
          <DeleteIcon style={{ marginRight: 7 }} /> DELETE
        </Button>
      </SectionHeader>
      <Paper>
        <Grid container rowSpacing={2} columnSpacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={generateAvatarImage(DetailType.PATIENT, patient.id)}
              sx={{ height: 100, width: 100 }}
              className="avatar"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              {patient.name} <b>{patient.surname}</b>
              <EditIcon className="icons" onClick={() => handleEditClick(String(id))} />
              <br />
            </Typography>
            <Typography variant="body1">{patient.address}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={3}>
          <Card>
            <CardContent className="card">
              <Typography variant="body1">HEALTH INFORMATION</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">PATIENT ID</Typography>
              <Typography variant="h4">{patient.id}</Typography>
              <Typography variant="body1">OPD</Typography>
              <Typography variant="h4">{patient.opd}</Typography>
              <Typography variant="body1">BLOOD GROUP</Typography>
              <Typography variant="h4">{getBloodType(patient.bloodGroup)}</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">Notes</Typography>
              <Typography variant="body1">{patient.notes}</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}</Typography>
              <Divider style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#e0e0e0" }} />
              <Typography variant="body1">
                <AccessTimeIcon /> Last admission:
                {patient.lastAdmission}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientDetail;
