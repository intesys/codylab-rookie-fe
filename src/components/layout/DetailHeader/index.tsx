import { DoctorDTO, PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import { Avatar, Card, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

interface IProps extends React.PropsWithChildren {
  record: PatientDTO | DoctorDTO;
  subTitle?: string;
  edit?: React.ReactElement;
  detailType: DetailType;
}

const DetailHeader: FC<IProps> = ({ record, subTitle, detailType, edit, children }) => {
  return (
    <Card data-cy="doctor-header">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Stack direction="row" alignItems="center">
            <Avatar
              alt={`${record?.name} ${record?.surname}`}
              src={generateAvatarImage(detailType, record?.id)}
              sx={{ width: 80, height: 80, margin: 2 }}
            />
            <Stack direction="column">
              <Stack direction="row">
                <Typography variant="h4" component="h1">
                  {record?.name} <strong>{record?.surname}</strong>
                </Typography>
                {edit && edit}
              </Stack>

              {subTitle && <Typography variant="body1">{subTitle}</Typography>}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} textAlign="right" pr={2}>
          {children}
        </Grid>
      </Grid>
    </Card>
  );
};

export default DetailHeader;
