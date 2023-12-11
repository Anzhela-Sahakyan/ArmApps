import { useState } from "react";
import { Banner } from "./BannerPaginationFilter";
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

  const handleInputChange = (field: keyof Banner, value: any) => {
    setEditedBanner((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedBanner);
    onClose();
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
          <input type="file" hidden />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
