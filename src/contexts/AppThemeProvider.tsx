"use client";
import { ReactNode, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";
import { ThemeProvider } from "@mui/material";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";
interface Props {
  children: ReactNode;
}
export const AppThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
  const setThemeManually = (theme: Theme) => {
    setTheme(theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeManually }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
