"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          border: "1px solid #dde0e3",
          borderRadius: "8px",
          width: "383px",
        },
      },
    },
  },
});

export default theme;
