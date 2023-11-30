import { Box } from "@mui/system";
import Categories from "./categories";
import Searchfield from "./searchfield";
import categoriesAray from "@/Data/categories";
import platformFilterArray from "@/Data/platformFilterArray";

export default function SearchAndFilter() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Searchfield />
        <Box>
          <Categories filterName="Categories" items={categoriesAray} />
        </Box>
        <Box>
          <Categories filterName="Platform" items={platformFilterArray} />
        </Box>
      </Box>
    </Box>
  );
}
