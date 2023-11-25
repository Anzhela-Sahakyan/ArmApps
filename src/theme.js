import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        border: "1px solid #dde0e3",
        borderRadius: "8px",
        width: "383px",
        height: "40px",
      },
    },
  },
});

export default theme;
