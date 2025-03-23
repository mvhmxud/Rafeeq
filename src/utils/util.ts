import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getSecondsUntilNextDay = () => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setHours(24, 0, 0, 0);
  return Math.floor((nextDay.getTime() - now.getTime()) / 1000);
};


export const handleDownloadSurah = async (surahId: number) => {
  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/chapter_recitations/2/${surahId}`
    );
    const data = await response.json();

    const audioUrl = data?.audio_file?.audio_url;
    if (!audioUrl) throw new Error("No audio file found");

    const audioResponse = await fetch(audioUrl);
    const blob = await audioResponse.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `surah-${surahId}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};