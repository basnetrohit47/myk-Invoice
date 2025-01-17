"use client";
import { Button } from "@mui/material";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme == "light" && <LightModeIcon color="primary" />}
      {theme == "dark" && <DarkModeIcon color="secondary" />}
    </Button>
  );
};

export default ThemeToggle;
