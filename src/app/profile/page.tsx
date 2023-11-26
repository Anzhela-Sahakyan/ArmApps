"use client";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import images from "@/Data/images";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
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
        //   className="flex flex-col items-center
        // justify-center "
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
            alt="show_pass_icon"
            width="20"
            height="20"
            style={{
              width: "64px",
              height: "50px",
              borderRadius: "50%",

              cursor: "pointer",
            }}
            onClick={logout}
          />
        </Box>
        {/* <Box>
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white
       font-bold py-2 px-4"
        >
          Log Out
        </button>
      </Box> */}
      </Box>
    </Box>
  );
}
