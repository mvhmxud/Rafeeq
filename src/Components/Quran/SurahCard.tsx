import React, { useCallback, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  MoreHorizontal,
  Download,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "../Ui/card";
import { handleDownloadSurah } from "@/utils/util";
import { UseTunez } from "tunez";
import axios from "axios";

interface SurahCardProps {
  id: number;
  name: string;
  englishName: string;
  verses: number;
}

const SurahCard = React.memo(
  ({
    surah,
    reciterId,
    locale,
  }: {
    reciterId: number;
    surah: SurahCardProps;
    locale: string | string[];
  }) => {
    const { playTrack } = UseTunez();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioCache = useRef<Record<number, string>>({});

    const handlePlaySurah = useCallback(
      async (surahId: number) => {
        if (audioCache.current[surahId]) {
          playTrack({
            author: "Rafeeq",
            src: audioCache.current[surahId],
            title: surah.arabicName,
            thumbnail: undefined,
          });
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahId}`
          );

          const audioUrl = response.data?.audio_file?.audio_url;
          if (!audioUrl) throw new Error("Error while getting audio src");

          // Cache the result
          audioCache.current[surahId] = audioUrl;

          playTrack({
            author: "Rafeeq",
            src: audioUrl,
            title: locale == "ar" ? surah.name : surah.englishName,
            thumbnail: undefined,
          });
        } catch (err) {
          setError("Error While Playing the Audio src");
        } finally {
          setLoading(false);
        }
      },
      [playTrack, reciterId]
    );

    return (
      <Card
        onClick={() => handlePlaySurah(surah.id)}
        className="bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen dark:hover:border-maingreen hover:shadow-md hover:shadow-maingreen/10 transition-all duration-300 cursor-pointer h-full group"
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-maingreen/10 text-maingreen flex items-center justify-center mr-3 group-hover:bg-maingreen/20 transition-colors">
              {surah.id}
            </div>
            <div>
              <h3 className="font-medium text-darkgrey dark:text-darkmode-lighttext group-hover:text-maingreen transition-colors">
                {locale === "ar" ? surah.name : surah.englishName}
              </h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span> {locale === "ar" ? surah.englishName : surah.name}</span>
                <span className="mx-2">•</span>
                <span>{surah.verses} آية</span>
              </div>
            </div>
          </div>

          {loading && (
            <LoaderCircle className="h-5 w-5 text-maingreen animate-spin" />
          )}
          {error && <AlertTriangle className="h-5 w-5 text-red-500" />}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-darkmode-dark transition-colors"
                onClick={(e) => e.stopPropagation()} // Prevent card click event
              >
                <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white dark:bg-darkmode-light border-gray-200 dark:border-darkmode-dark p-2 rounded-md"
            >
              <DropdownMenuItem
                className="flex items-center cursor-pointer text-darkgrey dark:text-darkmode-lighttext hover:text-maingreen dark:hover:text-maingreen"
                onClick={() => handleDownloadSurah(surah.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                <span>تحميل السورة</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    );
  }
);

export default SurahCard;
