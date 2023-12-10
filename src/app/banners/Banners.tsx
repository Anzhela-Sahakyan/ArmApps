import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BannerPaginationFilter from "./BannerPaginationFilter";
import { useState } from "react";

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
  const [appData, setAppData] = useState<Banner[]>(apps);
  const handleDelete = (appId: number | string) => {
    setAppData((prevApps) => prevApps.filter((app) => app.id === appId));
    onDelete(appId);
  };

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
          onDelete={onDelete}
        />
      </Table>
    </TableContainer>
  );
}
