"use client";

import { useEffect, ReactNode, useState } from "react";
import { useThemeStore } from "@/store/store";
import { ThemeProvider as NextThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <NextThemeProvider attribute="class">
      {children}
    </NextThemeProvider>
  );
}
