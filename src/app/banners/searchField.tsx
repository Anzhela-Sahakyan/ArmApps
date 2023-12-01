import { TextField } from "@mui/material";

export default function Searchfield() {
  return (
    <TextField
      id="outlined-basic"
      label="Search"
      size="small"
      variant="outlined"
      sx={{ borderRadius: "8px", border: "none" }}
    />
  );
}
