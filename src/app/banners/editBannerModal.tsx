import { useState } from "react";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Banner } from "./Banners";
import axios from "axios";
import { fileToBase64 } from "@/utils/file.util";

type onBannersChangeProps = (
  callback: (prev: Banner[]) => Banner[] | Banner[]
) => void;

interface EditBannerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (editedBanner: Banner) => void;
  banner: Banner;
  onBannersChange: onBannersChangeProps;
}

export default function EditBannerModal({
  open,
  onClose,
  onBannersChange,
  banner,
}: EditBannerModalProps) {
  const [editedBanner, setEditedBanner] = useState<Banner>(banner);
  const handleInputChange = (
    field: keyof Banner,
    value: number | string | File | boolean
  ) => {
    setEditedBanner((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    onClose();

    const editedBannerImage = new Blob([editedBanner.image]);
    const bannerImage = new Blob([banner.image]);
    const image =
      editedBanner.image instanceof File
        ? await fileToBase64(editedBannerImage)
        : banner.image;

    console.log(editedBanner.image);
    try {
      const response = await axios.put(
        `http://localhost:3002/banners/${banner.id}`,
        {
          ...editedBanner,
          image,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      onBannersChange((prev: any) => {
        return prev.map((banner: any) => {
          if (banner.id === editedBanner.id) {
            return { ...editedBanner, image };
          }
          return banner;
        });
      });
    } catch (error) {}
    // onSave(editedBanner);
  };

  const handleImageEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      setEditedBanner((prevData) => ({
        ...prevData,
        image: selectedFile,
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition>
      <DialogTitle>Edit Banner</DialogTitle>
      <DialogContent>
        <TextField
          label="Banner Name"
          value={editedBanner.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <TextField
          label="Banner Link"
          value={editedBanner.link}
          onChange={(e) => handleInputChange("link", e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={editedBanner.showInMobile}
              onChange={(e) =>
                handleInputChange("showInMobile", e.target.checked)
              }
            />
          }
          label="Show in Mobile"
        />
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{ marginTop: "15px" }}
        >
          Upload Banner Image
          <input type="file" hidden onChange={handleImageEdit} />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
