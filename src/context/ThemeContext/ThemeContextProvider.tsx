import React, { useEffect, useState } from "react";
import { Theme, ThemeContext, ThemeContextValues } from "./ThemeContext";

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark" || saved === "light") return saved;
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const context: ThemeContextValues = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};