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

export interface App {
  id: number | string;
  name: string;
  image: string;
  showInMobile: boolean;
}

interface ApplicationProps {
  apps: App[];
  page: number;
  rowsPerPage: number;
  onDelete: (appId: string | number) => Promise<void>;
}

export default function Application({
  apps,
  page,
  rowsPerPage,
}: ApplicationProps) {
  const [appData, setAppData] = useState<App[]>(apps);
  const handleDelete = (appId: number | string) => {
    setAppData((prevApps) => prevApps.filter((app) => app.id === appId));
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
          onDelete={handleDelete}
        />
      </Table>
    </TableContainer>
  );
}
