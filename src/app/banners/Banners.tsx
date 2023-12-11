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
  image: string | File;
  showInMobile: boolean;
  link: string;
}

interface BannerProbs {
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
}: BannerProbs) {
  const [editedBanner, setEditedBanner] = useState<Banner | null>(null);

  const saveEditedBanner = async (editedBanner: Banner) => {
    try {
      const response = await fetch(
        `http://localhost:3002/banners/${editedBanner.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedBanner),
        }
      );
      const data = await response.json();
      console.log("Banner edited", data);
    } catch (error) {
      console.log(error, "Couldn't update banner");
    }
  };

  const handleEdit = (editBanner: Banner) => {
    console.log("Edited Banner:", editBanner);

    saveEditedBanner(editBanner);
    setEditedBanner(null);
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
          banners={apps}
          page={page}
          rowsPerPage={rowsPerPage}
          onDelete={onDelete}
          onEdit={handleEdit}
        />
      </Table>
    </TableContainer>
  );
}
