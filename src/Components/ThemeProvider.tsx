"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/store";

export default function ThemeProvider() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
