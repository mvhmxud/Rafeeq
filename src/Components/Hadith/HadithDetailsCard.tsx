"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/Ui/card";
import { formatHadithText } from "@/utils/util";
import { BookText, Copy } from "lucide-react";
import { Skeleton } from "@/Components/Ui/skeleton"; // Import a Skeleton component

interface HadithDetailsCardProps {
  hadithEntry: HadithEntry;
  locale: string;
  collection: string;
}

export interface HadithEntry {
  collection: string;
  bookNumber: string;
  chapterId: string;
  hadithNumber: string;
  hadith: Hadith[];
}

interface Hadith {
  lang: "en" | "ar";
  chapterNumber: string;
  chapterTitle: string;
  urn: number;
  body: string;
  grades: Grade[];
}

interface Grade {
  graded_by: string | null;
  grade: string;
}

const HadithDetailsCard: React.FC<HadithDetailsCardProps> = ({
  hadithEntry,
  locale,
  collection,
}) => {
  const { hadith, hadithNumber } = hadithEntry;

  const [formattedText, setFormattedText] = useState<string | null>(null);
  const [localeHadith, setLocaleHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    const foundHadith = hadith.find((h) => h.lang === locale) || null;
    setLocaleHadith(foundHadith);

    if (foundHadith?.body) {
      setTimeout(() => {
        setFormattedText(formatHadithText(foundHadith.body));
      }, 500);
    } else {
      setFormattedText(
        locale === "ar" ? "نص الحديث غير متوفر" : "Hadith text not available"
      );
    }
  }, [hadith, locale]);

  return (
    <Card className="text-left bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen/50 transition-all duration-300">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-2">
            <div className="w-10 h-10 rounded-full bg-maingreen/10 text-maingreen flex items-center justify-center mr-3 flex-shrink-0">
              <BookText className="h-5 w-5" />
            </div>
            <div>
              <div
                className={`text-sm text-gray-500 dark:text-gray-400 mb-1 ${locale === "ar" ? "text-right" : "text-left"} `}
              >
                حديث رقم {hadithNumber}
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-darkgrey dark:text-darkmode-lighttext">
                  {collection}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-xs px-2 py-0.5 bg-maingreen/10 text-maingreen rounded-full">
                  {localeHadith?.grades?.[0]?.grade ||
                    (locale === "ar" ? "غير مصنف" : "Unclassified")}
                </span>
              </div>
            </div>
          </div>

          <button className="h-8 w-8 rounded-full hover:bg-maingreen/10 text-gray-500 dark:text-gray-400 hover:text-maingreen flex items-center justify-center">
            <Copy className="h-4 w-4" />
            <span className="sr-only">نسخ الحديث</span>
          </button>
        </div>

        {formattedText === null ? (
          <Skeleton className="h-20 w-full bg-gray-200 dark:bg-darkmode-light animate-pulse" />
        ) : (
          <p
            className={`text-darkgrey dark:text-darkmode-lighttext text-lg leading-relaxed ${
              locale === "ar" ? "text-right" : "text-left"
            }`}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></p>
        )}
      </CardContent>
    </Card>
  );
};

export default HadithDetailsCard;
