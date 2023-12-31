import { Button } from "@mui/material";
import { useState } from "react";
import AddBannerPopUp from "./AddBannerPopUp";

export default function AddBunnerBtn({ onOpenAddAppDialog }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bannerData, setBannerData] = useState({
    name: "New Banner",
    image: "/assets/newBanner.png",
    showInMobile: true,
  });
  const openDialog = () => {
    onOpenAddAppDialog();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const addBanner = async () => {
    closeDialog();
    try {
      const response = await fetch("http://localhost:3002/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bannerData),
      });

      if (response.ok) {
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        variant="contained"
        // className={styles.btnAddNew}
        sx={{
          width: "140px",
          height: "40px",
          color: "secondary.main",
          backgroundColor: "primary.main",
        }}
        onClick={openDialog}
      >
        Add banner
      </Button>
      <AddBannerPopUp
        isOpen={isDialogOpen}
        onClose={closeDialog}
        setBannerData={setBannerData}
        addBanner={addBanner}
      />
    </>
  );
}
