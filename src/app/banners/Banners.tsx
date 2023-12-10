import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BannerPaginationFilter from "./BannerPaginationFilter";

export interface Banner {
  id: number | string;
  name: string;
  image: string;
  showInMobile: boolean;
}

interface ApplicationProps {
  apps: Banner[];
  page: number;
  rowsPerPage: number;
  onDelete: (appId: string | number) => Promise<void>;
}

export default function Banners({
  apps,
  page,
  rowsPerPage,
  onDelete,
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
          banners={apps}
          page={page}
          rowsPerPage={rowsPerPage}
          onDelete={onDelete}
        />
      </Table>
    </TableContainer>
  );
}
