import { Link } from "@/i18n/navigation"
import { Card, CardContent } from "@/Components/Ui/card";
import { BookText, HandIcon as PrayingHands, Heart } from "lucide-react";

export default function HadithDoaaPage() {
  return (
    <div className="inner-container mx-auto px-4 py-12 ">
      <div className="mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4  bg-gradient-to-r from-maingreen to-darkgreen bg-clip-text text-transparent ">
            الحديث والدعاء
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            استكشف كنوز الحكمة والإيمان
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Hadith Card */}
          <Link href="/hadith-doaa/hadith" className="block">
            <Card className="h-full bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen dark:hover:border-maingreen hover:shadow-maingreen/10 cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 text-maingreen">
                  <BookText className="h-12 w-12" />
                </div>
                <h2 className="text-2xl font-bold text-darkgrey dark:text-darkmode-lighttext mb-3">
                  الحديث الشريف
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                 مكتبة من الأحاديث الموثوقة 
                </p>
                <div className="mt-auto pt-4 text-maingreen font-medium">
                  استعرض الأحاديث
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Doaa Card */}
          <Link href="/hadith-doaa/doaa" className="block">
            <Card className="h-full bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen dark:hover:border-maingreen hover:shadow-maingreen/10 cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 text-maingreen">
                  <PrayingHands className="h-12 w-12" />
                </div>
                <h2 className="text-2xl font-bold text-darkgrey dark:text-darkmode-lighttext mb-3">
                  الأدعية المأثورة
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
    مجموعة من الأدعية النبوية 
                </p>
                <div className="mt-auto pt-4 text-maingreen font-medium">
                  استعرض الأدعية
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
