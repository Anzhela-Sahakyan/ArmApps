import {
  Avatar,
  Checkbox,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

interface Banner {
  id: number | string;
  name: string;
  image: string;
  showInMobile: boolean;
}

interface ApplicationProps {
  banners: Banner[];
  page: number;
  rowsPerPage: number;
  onDelete: (bannerId: number | string) => void;
}

export default function BannerPaginationFilter({
  banners,
  page,
  rowsPerPage,
  onDelete,
}: ApplicationProps) {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    Record<string, boolean>
  >({});

  const displayedApps = banners.slice(startIndex, endIndex);

  const [showInMobile, setShowInMobile] = useState(false);

  const handleCheckboxChange = (bannerId: string | number) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [bannerId]: !prev[bannerId],
    }));
  };
  const handleDelete = (appId: number | string) => {
    onDelete(appId);
  };
  return (
    <TableBody>
      {displayedApps.map((banner, index) => (
        <TableRow key={banner.id}>
          <TableCell>{startIndex + index + 1}</TableCell>
          <TableCell>
            {<Avatar alt={banner.name} src={banner.image} />}
          </TableCell>
          <TableCell>{banner.name}</TableCell>
          <TableCell>
            <Checkbox
              checked={selectedCheckboxes[banner.id]}
              onChange={() => handleCheckboxChange(banner.id)}
            />
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
          <TableCell>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(banner.id)}
            >
              <Avatar
                alt="delete"
                src="/assets/delete.png"
                sx={{ width: "24px", height: "24px" }}
              />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
