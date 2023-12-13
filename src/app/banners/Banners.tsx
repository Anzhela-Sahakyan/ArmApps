import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BannerPaginationFilter from "./BannerPaginationFilter";
import { useEffect, useState } from "react";

export interface Banner {
  id: number | string;
  name: string;
  image: string | File;
  showInMobile: boolean;
  link: string;
}

type onBannersChangeProps = (props: Banner[]) => Banner[] | Banner[];

interface BannerProbs {
  banners: Banner[];
  page: number;
  rowsPerPage: number;
  onDelete: (appId: string | number) => Promise<void>;
  onBannersChange: (params: onBannersChangeProps) => void;
}

export default function Banners({
  banners,
  page,
  rowsPerPage,
  onDelete,
  onBannersChange,
}: BannerProbs) {
  const [isBunnerEdited, setIsBunnerEdited] = useState(false);

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
      console.log("editedbanner:::::", editedBanner);
      const data = await response.json();
      onBannersChange((prev: Banner[]) => {
        return prev.map((banner) => {
          if (banner.id === editedBanner.id) {
            return editedBanner;
          }
          return banner;
        });
      });

      console.log("Banner edited", data);
    } catch (error) {
      console.log(error, "Couldn't update banner");
    }
  };

  const handleEdit = (editBanner: Banner) => {
    console.log("Edited Banner:", editBanner);

    saveEditedBanner(editBanner);
    // setEditedBanner(null);
    setIsBunnerEdited(true);
  };
  useEffect(() => {
    if (isBunnerEdited) {
      console.log("Banner is editedd");
    }
  }, [isBunnerEdited]);
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
          banners={banners}
          page={page}
          rowsPerPage={rowsPerPage}
          onDelete={onDelete}
          onEdit={handleEdit}
        />
      </Table>
    </TableContainer>
  );
}
