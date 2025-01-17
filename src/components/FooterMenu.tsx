import { Paper, Typography } from "@mui/material";
import React from "react";

const FooterMenu = () => {
  return (
    <>
      <Paper className="flex flex-col gap-2 m-8 p-10" elevation={0}>
        <Typography>Copyright ©2024 myk-invoice.com</Typography>
        <Typography>Terms of Services</Typography>
        <Typography>Privacy Policy</Typography>
      </Paper>
    </>
  );
};

export default FooterMenu;
