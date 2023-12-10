import { TextField } from "@mui/material";

export default function BannerSearchfield() {
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
