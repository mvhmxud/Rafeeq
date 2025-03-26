import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/Components/Ui/badge";
import RadioCard from "@/Components/Radio/RadioCard";

interface Radio {
  id: number;
  name: string;
  img: string;
  url: string;
}

const fetchRadioStaions = async () => {
  try {
    const res = await fetch("https://data-rosy.vercel.app/radio.json");
    if (!res.ok) throw new Error("Erro While Fetching Data");
    const { radios } = await res.json();
    return radios;
  } catch (error) {
    console.log("Error Message : ", error);
  }
};
export default async function IslamicRadioPage() {
  const radioStations: Radio[] = await fetchRadioStaions();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-maingreen dark:hover:text-maingreen mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-darkgrey dark:text-darkmode-lighttext">
              الإذاعات الإسلامية
            </h1>
            <Badge
              variant="outline"
              className="bg-maingreen/5 text-maingreen border-maingreen/20"
            >
              {radioStations.length} إذاعة
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {radioStations.map((station) => (
            <RadioCard
              url={station.url}
              key={station.id}
              id={station.id}
              img={station.img}
              name={station.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
