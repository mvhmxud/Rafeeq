"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/Components/Ui/input";
import { Card, CardContent } from "@/Components/Ui/card";
import { Search, BookOpen } from "lucide-react";
import { useParams } from "next/navigation";

export interface Reciter {
  id: number;
  reciter_name: string;
  style: string | null;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export default function QuranRecitersList({
  reciters,
}: {
  reciters: Reciter[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const locale = params.locale;

  const filteredReciters = reciters
    .filter((reciter) => reciter.id !== 8) // Exclude reciterId 8 due to server error
    .filter((reciter) => {
      const reciterName =
        locale?.toString() === "ar"
          ? reciter.translated_name?.name || reciter.reciter_name
          : reciter.reciter_name;

      return reciterName.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="inner-container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-maingreen to-darkgreen bg-clip-text text-transparent">
          قراء القرآن الكريم
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          استمع إلى تلاوات القرآن الكريم بأصوات أشهر القراء
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-10 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="ابحث عن قارئ..."
          className="pl-10 py-6 bg-gray-100 dark:bg-darkmode-light border-gray-200 dark:border-darkmode-light text-darkgrey dark:text-darkmode-lighttext rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Reciters List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReciters.map((reciter) => (
          <Link key={reciter.id} href={`/quran/${reciter.id}`}>
            <Card className="bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen dark:hover:border-maingreen hover:shadow-md hover:shadow-maingreen/10 transition-all duration-300 cursor-pointer h-full group">
              <CardContent className="p-6 flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-maingreen/10 text-maingreen flex items-center justify-center mr-4 group-hover:bg-maingreen/20 transition-colors">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-darkgrey dark:text-darkmode-lighttext group-hover:text-maingreen transition-colors">
                    {locale?.toString() === "ar"
                      ? reciter.translated_name.name
                      : reciter.reciter_name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    قارئ القرآن الكريم
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredReciters.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">لا توجد نتائج مطابقة لبحثك</p>
          <p className="text-sm mt-2">حاول البحث بكلمات أخرى</p>
        </div>
      )}
    </div>
  );
}
