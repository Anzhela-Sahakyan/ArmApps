import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

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
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedApps = apps.slice(startIndex, endIndex);

  const [showInMobile, setShowInMobile] = useState(false);
  const handleCheckboxChange = () => {
    setShowInMobile((prev) => !prev);
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

        <TableBody>
          {displayedApps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.id}</TableCell>
              <TableCell>{<Avatar alt={app.name} src={app.image} />}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>
                <Checkbox
                  checked={app.showInMobile}
                  onChange={handleCheckboxChange}
                />
              </TableCell>

              <TableCell>
                <IconButton aria-label="delete">
                  <Avatar
                    alt="delete"
                    src="/assets/delete.png"
                    sx={{ width: "24px", height: "24px" }}
                  />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <Avatar
                    alt="edit_icon"
                    src="/assets/edit.png"
                    sx={{ width: "24px", height: "24px" }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
