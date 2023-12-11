import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { Checkbox, FormControlLabel } from "@mui/material";

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
      console.log("sending request with data:", bannerData);
      const response = await fetch("http://localhost:3002/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bannerData),
      });
      console.log(response);
      if (response.ok) {
        console.log("response is ok");
      } else {
        console.log("adding failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      console.log("selected file::::", selectedFile);
      setBannerData((prevData) => ({
        ...prevData,
        image: selectedFile,
      }));
      console.log("updated Banner data::::0", bannerData);
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
          sx={{ marginTop: "15px" }}
        >
          Upload Banner Image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <FormControlLabel
            value="start"
            control={<Checkbox />}
            label="Show in mobile"
            labelPlacement="start"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="primary">
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
