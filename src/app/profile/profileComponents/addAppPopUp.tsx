import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import categoriesAray from "@/Data/categories";
import Categories from "./categories";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const AddAppDialog = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle>Add New App</DialogTitle>
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
          label="App Name"
          name="appName"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Google Play URL"
          name="googlePlayUrl"
          fullWidth
          margin="normal"
        />
        <TextField
          label="App Store URL"
          name="appStoreUrl"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{ marginTop: "15px" }}
        >
          Upload Header Image
          <input type="file" hidden />
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
        <Categories filterName="Categories" items={categoriesAray} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="outlined" onClick={onClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppDialog;
