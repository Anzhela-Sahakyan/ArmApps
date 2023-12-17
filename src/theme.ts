"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B9FF",
      light: "#D0D5DD",
      dark: "#344054",
    },
    secondary: {
      main: "#ffffff",
      light: "#F3BA11",
    },
    info: {
      main: "#EFF7FF",
    },
    error: {
      main: "#F4635E",
    },
  },
});

export default theme;
