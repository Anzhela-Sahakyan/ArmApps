"use client";
import { Button, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import images from "@/Data/images";
import Link from "next/link";

import { useRouter } from "next/navigation";
import SearchAndFilter from "./profileComponents/searchAndFilter";
import { useState } from "react";
import AddApp from "./profileComponents/addApp";

import styles from "./profileComponents/page.module.css";
import Application from "./applicationList/application";
import apps from "@/Data/apps";

export default function ProfilePage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "0 20px",
          backgroundColor: "#1A202C",
          width: "100%",
          height: "80px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button variant="text">Application</Button>
          <Button variant="text">Categories</Button>
          <Button variant="text">Banners</Button>
        </Box>
        <Box
          sx={{
            marginY: "auto",
            marginLeft: "auto",
          }}
        >
          <Image
            src={images.profilePicIcon}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            alt="show_pass_icon"
            width="20"
            height="20"
            style={{
              width: "64px",
              height: "50px",
              borderRadius: "50%",

              cursor: "pointer",
            }}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Box>
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
      <Application apps={apps} />
    </Box>
  );
}
