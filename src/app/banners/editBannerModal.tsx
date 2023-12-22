import { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Banner } from "./Banners";
import axios from "axios";
import { fileToBase64 } from "@/utils/file.util";
import { Box } from "@mui/system";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof Banner,
    value: number | string | File | boolean
  ) => {
    setEditedBanner((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    onClose();

    const editedBannerImage = new Blob([editedBanner.image]);
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
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        width: "463px",
        height: "auto",
        flexShrink: "0",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <DialogTitle>Edit Banner</DialogTitle>
        <IconButton
          sx={{ marginRight: "18px" }}
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "normal",
            color: "#191928",
          }}
        >
          Banner Name*
        </Typography>

        <TextField
          sx={{ marginBottom: "30px", marginTop: "15px", width: "100%" }}
          value={editedBanner.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "normal",
            color: "#191928",
          }}
        >
          Banner link
        </Typography>
        <TextField
          sx={{ marginTop: "15px", width: "100%" }}
          value={editedBanner.link}
          onChange={(e) => handleInputChange("link", e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt={imagePreview}
              style={{
                marginTop: "15px",
                minWidth: "340px",
                minHeight: "250px",
              }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={(theme) => ({
            marginTop: "15px",
            backgroundColor: theme.palette.info.main,
            color: "primary.main",
          })}
        >
          Replace Banner Image
          <input type="file" hidden onChange={handleImageEdit} />
        </Button>
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={editedBanner.showInMobile}
              onChange={(e) =>
                handleInputChange("showInMobile", e.target.checked)
              }
              sx={(theme) => ({
                "&.Mui-checked .MuiSvgIcon-root": {
                  fill: theme.palette.secondary.light,
                },
              })}
            />
          }
          label="Show in Mobile"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderColor: "primary.light", color: "primary.dark" }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
