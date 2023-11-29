import { Box } from "@mui/system";
import Categories from "./categories";
import Searchfield from "./searchfield";
import AddApp from "./addApp";

export default function SearchAndFilter() {
  const categories = [
    { value: "Կրթական", label: "Կրթական" },
    { value: "Խաղեր", label: "Խաղեր" },
    { value: "Ծրագրեր", label: "Ծրագրեր" },
  ];
  const platform = [
    { value: "Sololearn", label: "Sololearn" },
    { value: "Picsart", label: "Picsart" },
    { value: "Sololearn1", label: "Sololearn1" },
  ];
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
          <Categories filterName="Categories" items={categories} />
        </Box>
        <Box>
          <Categories filterName="Platform" items={platform} />
        </Box>
      </Box>
    </Box>
  );
}
