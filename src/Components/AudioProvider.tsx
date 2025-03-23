"use client";
import { useThemeStore } from "@/store/store";
import React, { ReactNode } from "react";
import AudioPlayer, { TunezProvider } from "test-tunez";
const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();
  return (
    <TunezProvider>
      {children}
    </TunezProvider>
  );
};

export default AudioProvider;
