"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/Components/Ui/badge";
import { QuranList } from "@/utils/CONSTANTS";
import SurahCard from "@/Components/Quran/SurahCard";
import { useDebounce } from "use-debounce";
import SearchInput from "@/Components/SearchInput";
import { notFound, useParams } from "next/navigation";
import SquareLoader from "@/Components/Ui/Loader";
import { Reciter } from "../RecitersList";

export default function ReciterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [reciter, setReciter] = useState<Reciter | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const reciterId = Number(params.reciterId);
  const locale = params.locale || "ar";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.quran.com/api/v4/resources/recitations?language=ar"
        );
        const { recitations } = await res.json();
        const currReciter = recitations.find((rec) => rec.id === reciterId);
        if (!currReciter) {
          notFound();
          return;
        }

        setReciter(currReciter);
      } catch (error) {
        console.log("error message:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [reciterId]);

  const filteredSurahs = useMemo(() => {
    if (!debouncedSearchQuery) return QuranList;
    return QuranList.filter(
      (surah) =>
        surah.name.includes(debouncedSearchQuery) ||
        surah.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        surah.id.toString().includes(debouncedSearchQuery)
    );
  }, [debouncedSearchQuery]);

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] grid place-content-center">
        <SquareLoader />
      </div>
    );
  }

  if (!reciter) return notFound();

  return (
    <div className="inner-container mx-auto px-4 py-12">
      <div className="mx-auto">
        <div className="mb-10">
          <Link
            href="/quran"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-maingreen dark:hover:text-maingreen mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>العودة إلى قائمة القراء</span>
          </Link>

          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-3 px-3 py-1 border-maingreen/30 text-maingreen"
            >
              قارئ القرآن الكريم
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-maingreen to-darkgreen bg-clip-text text-transparent">
              {locale === "ar"
                ? reciter.translated_name?.name || reciter.reciter_name
                : reciter.reciter_name}
            </h1>
          </div>
        </div>

        <SearchInput
          placeHolder="إبحث عن سورة"
          value={searchQuery}
          handler={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <SurahCard locale={locale} key={surah.id} reciterId={reciterId} surah={surah} />
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg">لا توجد نتائج مطابقة لبحثك</p>
            <p className="text-sm mt-2">حاول البحث بكلمات أخرى</p>
          </div>
        )}
      </div>
    </div>
  );
}
