import { createContext } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeManually: (theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
