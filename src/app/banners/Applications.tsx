import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BannerPaginationFilter from "./BannerPaginationFilter";

interface App {
  id: number | string;
  name: string;
  image: string;
  showInMobile: boolean;
}

interface ApplicationProps {
  apps: App[];
  page: number;
  rowsPerPage: number;
}

export default function Application({
  apps,
  page,
  rowsPerPage,
}: ApplicationProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Show in mobile</TableCell>
          </TableRow>
        </TableHead>
        <BannerPaginationFilter
          apps={apps}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
