import { Avatar, TableCell } from "@mui/material";
import { Banner } from "./Banners";
import { FC } from "react";

interface BannerImageProps {
  banner: Banner;
}

const BannerImage: FC<BannerImageProps> = ({ banner: { image, name } }) => {
  console.log(image, "BannerImage");
  return (
    <TableCell>
      <Avatar alt={name} src={image as string} />
    </TableCell>
  );
};

export default BannerImage;
