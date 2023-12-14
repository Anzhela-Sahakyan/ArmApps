import { useState } from "react";

import {
  Backdrop,
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

interface EditBannerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (editedBanner: Banner) => void;
  banner: Banner;
}

export default function EditBannerModal({
  open,
  onClose,
  onSave,
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
    onSave(editedBanner);
    try {
      console.log("sending request with data::::::::", editedBanner);

      const response = await axios.post(
        "http://localhost:3002/banners",
        {
          ...editedBanner,
          image: editedBanner.image
            ? await fileToBase64(editedBanner.image as Blob)
            : editedBanner.image,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("editedbanner.image::::::::", editedBanner.image);
      console.log(response);
      //   if (response) {
      //     console.log("response is ok");
      //   } else {
      //     console.log("adding failed");
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      console.log("selected file::::", selectedFile);
      setEditedBanner((prevData) => ({
        ...prevData,
        image: selectedFile,
      }));
      console.log("edited Banner data::::0", editedBanner);
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
