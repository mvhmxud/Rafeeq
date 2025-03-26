"use client";
import React, { ReactNode } from "react";
import { TunezProvider } from "tunez";
const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <TunezProvider>{children}</TunezProvider>;
};

export default AudioProvider;
