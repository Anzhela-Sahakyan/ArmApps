"use client";
import { Box } from "@mui/system";

import Link from "next/link";

import SearchAndFilter from "./profileComponents/searchAndFilter";
import AddApp from "./profileComponents/addApp";

import Application from "./applicationList/application";
import apps from "@/Data/apps";
import Pagination from "./applicationList/Pagination";
import Banner from "./profileComponents/banner";
import { useState } from "react";

export default function ProfilePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      <Banner />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchAndFilter />
        <AddApp />
      </Box>
      <Application apps={apps} page={page} rowsPerPage={rowsPerPage} />
      <Pagination
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
}
