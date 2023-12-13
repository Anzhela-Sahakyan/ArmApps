"use client";

import { Box } from "@mui/system";
import Header from "../profile/profileComponents/header";
import Banners, { Banner } from "./Banners";
import { useEffect, useState } from "react";
import BannerSearchfield from "../profile/profileComponents/searchfield";
import AddBunnerBtn from "./AddBunnerBtn";
import BannerPagination from "./BannerPagination";
import AddBannerPopUp from "./AddBannerPopUp";

export default function BannersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);
  const [bannerApps, setBannerApps] = useState<Banner[]>([]);
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);
  const [isNewBannerAdded, setIsNewBannerAdded] = useState(false);

  const handleSearch = (query: any) => {
    const filtered = bannerApps.filter((banner) =>
      banner.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBanners(filtered);
  };

  const handleOpenAddApp = () => {
    setIsAddBannerOpen(true);
  };
  const handleCloseAddApp = () => {
    setIsAddBannerOpen(false);
    setIsNewBannerAdded(true);
  };
  const handleDeleteApp = async (appId: number | string) => {
    try {
      await fetch(`http://localhost:3002/banners/${appId}`, {
        method: "DELETE",
      });
      setFilteredBanners((prevApps) =>
        prevApps.filter((app) => {
          return app.id !== appId;
        })
      );
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
        setFilteredBanners(data);
        console.log(filteredBanners, "filtered banners");
        setIsAddBannerOpen(false);
      } catch (error) {
        console.log(error, "fetching data from db.json has failed");
      }
    };

    receivedData();
  }, [isNewBannerAdded]);

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
        <BannerSearchfield onSearch={handleSearch} />
        <AddBunnerBtn onOpenAddAppDialog={handleOpenAddApp} />
      </Box>
      <Banners
        banners={filteredBanners}
        page={page}
        rowsPerPage={rowsPerPage}
        onDelete={handleDeleteApp}
        onBannersChange={setFilteredBanners}
      />
      <BannerPagination
        totalItems={filteredBanners.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddBannerPopUp isOpen={isAddBannerOpen} onClose={handleCloseAddApp} />
    </Box>
  );
}
