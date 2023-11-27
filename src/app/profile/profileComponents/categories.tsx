import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Checkbox,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import { useState } from "react";

interface CategoriesProps {
  filterName: string;
  items: { value: string; label: string }[];
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};
export default function Categories({ filterName, items }: CategoriesProps) {
  const [inputBoxContent, setinputBoxContent] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<typeof inputBoxContent>) => {
    const {
      target: { value },
    } = e;
    setinputBoxContent(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">{filterName}</InputLabel>
        <Select
          sx={{ width: "200px", height: "42px" }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={inputBoxContent}
          label="Category"
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={inputBoxContent.indexOf(item.value) > -1} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
