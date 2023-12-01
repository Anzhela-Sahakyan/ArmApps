"use client";

import { Box } from "@mui/system";
import Header from "../profile/profileComponents/header";
import Applications from "./Applications";
import bannerApps from "@/Data/bannerApps";
import { useState } from "react";
import BannerSearchfield from "../profile/profileComponents/searchfield";
import AddBunnerBtn from "./AddBunnerBtn";
import BannerPagination from "./BannerPagination";
import AddBannerPopUp from "./AddBannerPopUp";

export default function BannersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);

  const handleOPenAddApp = () => {
    setIsAddBannerOpen(true);
  };
  const handleCloseAddApp = () => {
    setIsAddBannerOpen(false);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BannerSearchfield />
        <AddBunnerBtn onOpenAddAppDialog={handleOPenAddApp} />
      </Box>
      <Applications apps={bannerApps} page={page} rowsPerPage={rowsPerPage} />
      <BannerPagination
        totalItems={bannerApps.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddBannerPopUp isOpen={isAddBannerOpen} onClose={handleCloseAddApp} />
    </Box>
  );
}
