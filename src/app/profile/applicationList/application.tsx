import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import ProfilePaginationFilter from "./ProfilePaginationFilter";

interface App {
  id: number | string;
  name: string;
  icon: string;
  title: string;
  platform: string;
  version: string;
  store: string;
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
            <TableCell>Name</TableCell>
            <TableCell>Icon</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Store</TableCell>
          </TableRow>
        </TableHead>
        <ProfilePaginationFilter
          apps={apps}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
