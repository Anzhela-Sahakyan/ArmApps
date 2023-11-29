import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import images from "@/Data/images";

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
}
export default function Application({ apps }: ApplicationProps) {
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
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.name}>
              <TableCell>{app.id}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>
                {
                  <img
                    src={images[app.icon]}
                    alt="icon"
                    style={{ width: "40px", height: "40px" }}
                  />
                }
              </TableCell>
              <TableCell>{app.title}</TableCell>
              <TableCell>{app.platform}</TableCell>
              <TableCell>{app.version}</TableCell>
              <TableCell>{app.store}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
