"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Link from "next/link";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGetProfile } from "@/repository/hooks/useGetProfile.hook";
const ProfileAvatar = () => {
  const { data: profile } = useGetProfile();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };
  return (
    <div>
      <>
        <IconButton
          onClick={handleClick}
          sx={{
            p: 0,
            "&:hover": {
              backgroundColor: "transparent", // No hover background
              "& .hover-text": {
                textDecoration: "underline", // Underline Typography on hover
              },
            },
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{profile?.first_name?.charAt(0)}</Avatar>
          <ArrowDropDownIcon />
        </IconButton>

        <Menu
          sx={{ height: "400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem component={Link} href="/profile">
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    </div>
  );
};

export default ProfileAvatar;
