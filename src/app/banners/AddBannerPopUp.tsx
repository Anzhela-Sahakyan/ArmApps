import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Box, color } from "@mui/system";
import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { fileToBase64 } from "@/utils/file.util";

interface BannerData {
  id: string;
  name: string;
  googlePlayUrl: string;
  showInMobile: boolean;
  image: File | null;
}

const AddBannerPopUp = ({ isOpen, onClose }: any) => {
  const [bannerData, setBannerData] = useState<BannerData>({
    id: "",
    name: "",
    googlePlayUrl: "",
    showInMobile: false,
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBannerData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddBanner = async () => {
    onClose();
    try {
      const response = await axios.post(
        "http://localhost:3002/banners",
        {
          ...bannerData,
          image: bannerData.image ? await fileToBase64(bannerData.image) : null,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      //   if (response) {
      //
      //   } else {
      //
      //   }
    } catch (error) {}
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      setBannerData((prevData) => ({
        ...prevData,
        image: selectedFile,
      }));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle>Add New Banner</DialogTitle>
        <IconButton
          sx={{ marginRight: "18px" }}
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <TextField
          label="Banner Name"
          name="name"
          fullWidth
          margin="normal"
          required
          onChange={handleInputChange}
          value={bannerData.name}
        />

        <TextField
          label="Banner URL"
          name="googlePlayUrl"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
          value={bannerData.googlePlayUrl}
        />

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
          Upload Banner Image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <FormControlLabel
            value="start"
            label="Show in mobile"
            control={
              <Checkbox
                sx={(theme) => ({
                  "&.Mui-checked .MuiSvgIcon-root": {
                    fill: theme.palette.secondary.light,
                  },
                })}
              />
            }
            labelPlacement="start"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderColor: "primary.light", color: "primary.dark" }}
        >
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleAddBanner} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBannerPopUp;
