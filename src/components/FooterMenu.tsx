import { Typography } from "@mui/material";
import React from "react";

const FooterMenu = () => {
  return (
    <>
      <div className="flex flex-col gap-2 m-8 p-10">
        <Typography>Copyright ©2024 myk-invoice.com</Typography>
        <Typography>Terms of Services</Typography>
        <Typography>Privacy Policy</Typography>
      </div>
    </>
  );
};

export default FooterMenu;
