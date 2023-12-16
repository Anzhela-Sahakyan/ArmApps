import { Button, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import images from "@/Data/images";

export default function Header() {
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
    } catch (error: any) {}
  };

  return (
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
        <Button
          variant="text"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Application
        </Button>
        <Button variant="text">Categories</Button>
        <Button variant="text" onClick={() => router.push("/banners")}>
          Banners
        </Button>
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
  );
}
