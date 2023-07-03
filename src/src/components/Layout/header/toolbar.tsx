import {
  Dataset,
  NotificationsNoneOutlined,
  QuestionAnswerOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Toolbar: React.FC = () => (
  <Grid
    container
    spacing={4}
    className="layout-header-toolbar"
    // direction="row"
    justifyContent="center"
    alignItems="center"
    padding={1}
  >
    <Grid item xs={6} className="layout-header-toolbar-welcome-message">
      Hospital St. Democrito - Welcome back,{" "}
      <Typography variant="body2" color="primary" component="strong">
        Mario Rossi
      </Typography>
    </Grid>
    <Grid item xs={6} className="layout-header-toolbar-menu">
      <div className="layout-header-toolbar-menu-search">
        <TextField
          size="small"
          variant="standard"
          sx={{
            fontSize: 12,
          }}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          typography: "body2",
          gap: 1,
          minWidth: 150,
        }}
      >
        <NotificationsNoneOutlined fontSize="small" />
        <QuestionAnswerOutlined fontSize="small" />
        <Dataset fontSize="small" />
        <SettingsOutlined fontSize="small" />
      </Box>
    </Grid>
  </Grid>
);

export default Toolbar;
