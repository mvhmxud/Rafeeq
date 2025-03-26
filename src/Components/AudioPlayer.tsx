"use client";
import { useThemeStore } from "@/store/store";
import { X } from "lucide-react";
import React from "react";
import AudioPlayer, { UseTunez } from "tunez";

const AudioPlayerComp = () => {
  const { theme } = useThemeStore();
  const { currentTrack, audioRef, setCurrentTrack } = UseTunez();

  if (!currentTrack) return null;
  const CloseAudioHandler = () => {
    setCurrentTrack(null);
    audioRef.current = null;
  };

  return (
    <div style={{ direction: "ltr" }}>
      <button
        onClick={CloseAudioHandler}
        className="fixed bottom-24 cursor-pointer hover:scale-110 right-6 w-10 h-10 rounded-full bg-maingreen/10 text-maingreen flex items-center justify-center transition-all hover:bg-maingreen/20 hover:shadow-md"
      >
        <X className="h-6 w-6" />
      </button>

      <AudioPlayer
        forward
        showAuthor
        showThumbnail
        darkMode={theme === "dark"}
        theme={{
          primaryColor: "#0ba56a",
          secondaryColor: "#0ba56a",
        }}
      />
    </div>
  );
};

export default AudioPlayerComp;
