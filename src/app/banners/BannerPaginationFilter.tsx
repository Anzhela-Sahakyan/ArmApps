import {
  Avatar,
  Checkbox,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import EditBannerModal from "./editBannerModal";

export interface Banner {
  id: number | string;
  name: string;
  image: string | File;
  showInMobile: boolean;
  link: string;
}

interface BannerPaginationFilterProps {
  banners: Banner[];
  page: number;
  rowsPerPage: number;
  onDelete: (bannerId: number | string) => void;
  onEdit: (editBanner: Banner) => void;
}

export default function BannerPaginationFilter({
  banners,
  page,
  rowsPerPage,
  onDelete,
  onEdit,
}: BannerPaginationFilterProps) {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    Record<string, boolean>
  >({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const displayedApps = banners.slice(startIndex, endIndex);

  const [showInMobile, setShowInMobile] = useState(false);

  const handleCheckboxChange = async (bannerId: string | number) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [bannerId]: !prev[bannerId],
    }));
  };
  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedBanner(null);
  };

  const handleEditSave = (editedBanner: Banner) => {
    onEdit(editedBanner);
  };
  const handleDelete = (appId: number | string) => {
    onDelete(appId);
  };
  return (
    <>
      <TableBody>
        {displayedApps.map((banner, index) => (
          <TableRow key={banner.id}>
            <TableCell>{startIndex + index + 1}</TableCell>
            <TableCell>
              {typeof banner.image === "string" ? (
                <Avatar alt={banner.name} src={banner.image} />
              ) : (
                <Avatar alt={banner.name} src="" />
              )}
            </TableCell>
            <TableCell>{banner.name}</TableCell>
            <TableCell>
              <Checkbox
                checked={selectedCheckboxes[banner.id]}
                onChange={() => handleCheckboxChange(banner.id)}
              />
            </TableCell>

            <TableCell>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditClick(banner)}
              >
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
      {selectedBanner && (
        <EditBannerModal
          open={editModalOpen}
          onClose={handleEditModalClose}
          onSave={handleEditSave}
          banner={selectedBanner}
        />
      )}
    </>
  );
}
