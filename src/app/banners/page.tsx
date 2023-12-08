"use client";

import { Box } from "@mui/system";
import Header from "../profile/profileComponents/header";
import Applications, { App } from "./Applications";
// import bannerApps from "@/Data/bannerApps";
import { useEffect, useState } from "react";
import BannerSearchfield from "../profile/profileComponents/searchfield";
import AddBunnerBtn from "./AddBunnerBtn";
import BannerPagination from "./BannerPagination";
import AddBannerPopUp from "./AddBannerPopUp";

export default function BannersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);
  const [bannerApps, setBannerApps] = useState<App[]>([]);

  const handleOpenAddApp = () => {
    setIsAddBannerOpen(true);
  };
  const handleCloseAddApp = () => {
    setIsAddBannerOpen(false);
  };
  const handleDeleteApp = async (appId: number | string) => {
    try {
      await fetch(`http://localhost:3002/banners/${appId}`, {
        method: "DELETE",
      });
      setBannerApps((prevApps) =>
        prevApps.filter((app) => {
          return app.id !== appId;
        })
      );
      console.log(bannerApps);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const receivedData = async () => {
      try {
        const response = await fetch("http://localhost:3002/banners");
        const data = await response.json();
        setBannerApps(data);
        setIsAddBannerOpen(false);
      } catch (error) {
        console.log(error, "fetching data from db.json has failed");
      }
    };

    receivedData();
  }, []);

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
        <AddBunnerBtn onOpenAddAppDialog={handleOpenAddApp} />
      </Box>
      <Applications
        apps={bannerApps}
        page={page}
        rowsPerPage={rowsPerPage}
        onDelete={handleDeleteApp}
      />
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
