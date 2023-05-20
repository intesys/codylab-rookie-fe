import { MenuItem } from "@mui/material";
import React from "react";
import { PatientBloodGroupEnum } from "../generated/axios";
import { getBloodType } from "./utils";

export const bloodTypeOptions = (): React.ReactElement => {
  return (
    <>
      <MenuItem value={PatientBloodGroupEnum.AMinus}>{getBloodType(PatientBloodGroupEnum.AMinus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.APlus}>{getBloodType(PatientBloodGroupEnum.APlus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.BMinus}>{getBloodType(PatientBloodGroupEnum.BMinus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.BPlus}>{getBloodType(PatientBloodGroupEnum.BPlus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.AbMinus}>{getBloodType(PatientBloodGroupEnum.AbMinus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.AbPlus}>{getBloodType(PatientBloodGroupEnum.AbPlus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.ZeroMinus}>{getBloodType(PatientBloodGroupEnum.ZeroMinus)}</MenuItem>
      <MenuItem value={PatientBloodGroupEnum.ZeroPlus}>{getBloodType(PatientBloodGroupEnum.ZeroPlus)}</MenuItem>
    </>
  );
};
