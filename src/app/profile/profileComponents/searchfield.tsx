import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface BannerSearchfieldProps {
  onSearch: (query: string) => void;
}

export default function BannerSearchfield({
  onSearch,
}: BannerSearchfieldProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      size="small"
      variant="outlined"
      sx={{ borderRadius: "8px", border: "none", margin: "10px" }}
      value={searchQuery}
      onChange={handleChange}
    />
  );
}
