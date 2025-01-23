"use client";
import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";
import { ThemeProvider } from "@mui/material";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";
import { getStoreValue, setStoreValue } from "@/utils/localStorageUtil";
interface Props {
  children: ReactNode;
}
export const AppThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>("light"); // Default theme

  // Fetch theme from localStorage after the component mounts
  useEffect(() => {
    const storedTheme = getStoreValue<string>("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setStoreValue("theme", theme == "light" ? "dark" : "light");
    setTheme(theme == "light" ? "dark" : "light");
  };
  const setThemeManually = (theme: Theme) => {
    setTheme(theme);
    setStoreValue("theme", theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeManually }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
