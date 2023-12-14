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
import BannerImage from "./BannerImage";
import { Banner } from "./Banners";
import axios from "axios";

interface BannerPaginationFilterProps {
  banners: Banner[];
  page: number;
  rowsPerPage: number;
  onDelete: (bannerId: number | string) => void;
  onEdit: (editBanner: Banner) => void;
  onBannersChange: (updatedBanners: Banner[]) => void;
}

export default function BannerPaginationFilter({
  banners,
  page,
  rowsPerPage,
  onDelete,
  onEdit,
  onBannersChange,
}: BannerPaginationFilterProps) {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const displayedApps = banners.slice(startIndex, endIndex);

  const handleCheckboxChange = async (
    bannerId: string | number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const updatedBanners = banners.map((banner) =>
        banner.id === bannerId
          ? {
              ...banner,
              showInMobile: event.target.checked,
            }
          : banner
      );
      onBannersChange(updatedBanners);

      await axios.patch(`http://localhost:3002/banners/${bannerId}`, {
        showInMobile: event.target.checked,
      });
    } catch (error) {
      console.log("error updating banner", error);
    }
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
            <BannerImage banner={banner} />
            <TableCell>{banner.name}</TableCell>
            <TableCell>
              <Checkbox
                checked={banner.showInMobile}
                onChange={(event) => handleCheckboxChange(banner.id, event)}
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
