import {
  Dataset,
  NotificationsNone,
  QuestionAnswer,
  Search,
  Settings,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";

const Toolbar: React.FC = () => (
  <Grid container spacing={4} className="layout-header-toolbar">
    <Grid item xs={6} className="layout-header-toolbar-welcome-message">
      Hospital St. Democrito - Welcome back, Mario Rossi
    </Grid>
    <Grid item xs={6} className="layout-header-toolbar-menu">
      <div className="layout-header-toolbar-menu-search">
        <Search />
        <input type="text" placeholder="search" />
      </div>
      <ul>
        <li>
          <NotificationsNone />
        </li>
        <li>
          <QuestionAnswer />
        </li>
        <li>
          <Dataset />
        </li>
        <li>
          <Settings />
        </li>
      </ul>
    </Grid>
  </Grid>
);

export default Toolbar;
