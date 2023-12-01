import {
  Avatar,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

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

export default function ProfilePaginationFilter({
  apps,
  page,
  rowsPerPage,
}: ApplicationProps) {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedApps = apps.slice(startIndex, endIndex);

  return (
    <TableBody>
      {displayedApps.map((app) => (
        <TableRow key={app.id}>
          <TableCell>{app.id}</TableCell>
          <TableCell>{app.name}</TableCell>
          <TableCell>{<Avatar alt={app.name} src={app.icon} />}</TableCell>
          <TableCell>{app.platform}</TableCell>
          <TableCell>{app.version}</TableCell>
          <TableCell>{app.store}</TableCell>
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
  );
}
