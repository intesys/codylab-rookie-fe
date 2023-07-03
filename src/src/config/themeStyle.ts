import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
    secondary: {
      light: "#fff",
      main: "#000",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});
