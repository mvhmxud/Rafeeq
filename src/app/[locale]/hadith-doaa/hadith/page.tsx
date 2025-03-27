import { HadithCard } from "@/Components/Hadith/Card";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";

export interface Collection {
  lang: string;
  title: string;
  shortIntro: string;
}

interface HadithCollection {
  name: string;
  hasBooks: boolean;
  hasChapters: boolean;
  collection: Collection[];
  totalHadith: number;
  totalAvailableHadith: number;
}

async function getCollections() {
  "use server";
  try {
    const headers: HeadersInit = {
      "X-API-Key": process.env.SUNNAH_API_KEY ?? "",
    };
    const res = await fetch(`${process.env.SUNNAH_API_BASE_URL}/collections`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60 * 60 * 24,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch collections");
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Collections:", error);
    return null;
  }
}

export default async function HadithCollectionsPage() {
  const localee = (await cookies()).get("NEXT_LOCALE")?.value;
  const hadithCollections: HadithCollection[] = (await getCollections()).filter(
    (col: HadithCollection) => col.hasBooks
  );
  const { hadithDoaa } = await getMessages();
  return (
    <div className="inner-container mx-auto px-4 py-12">
      <div className=" mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-darkgrey dark:text-darkmode-lighttext">
            {hadithDoaa.hadith.header}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {hadithDoaa.hadith.desc}
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {hadithCollections.map((collection, idx) => (
            <HadithCard
              key={idx}
              id={collection.name}
              title={
                collection.collection.filter(
                  (colLang) => colLang.lang == localee
                )[0].title
              }
              href={`hadith/${collection.name}`}
              type="collection"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
