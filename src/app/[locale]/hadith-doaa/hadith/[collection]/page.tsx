import { HadithCard as HadithBookCard } from "@/Components/Hadith/Card";
import { cookies } from "next/headers";
import { Collection as CollectionInfo } from "../page";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

const fetchCollectionBooks = async (collectionName: string) => {
  try {
    const headers: HeadersInit = {
      "X-API-Key": process.env.SUNNAH_API_KEY ?? "",
    };
    const res = await fetch(
      `${process.env.SUNNAH_API_BASE_URL}/collections/${collectionName}/books`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error while fetching collections:", error);
    return null;
  }
};

const fetchCollectionName = async (collectionName: string) => {
  try {
    const headers: HeadersInit = {
      "X-API-Key": process.env.SUNNAH_API_KEY ?? "",
    };
    const res = await fetch(
      `${process.env.SUNNAH_API_BASE_URL}/collections/${collectionName}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    );
    if (!res.ok) return null;
    const { collection } = await res.json();
    return collection;
  } catch (error) {
    console.error("Error while fetching collection name:", error);
    return null;
  }
};

interface BookTitle {
  lang: "ar" | "en";
  name: string;
}
interface HadithBook {
  book: BookTitle[];
  bookNumber: number;
  hadithEndNumber: number;
  hadithStartNumber: number;
  numberOfHadith: number;
}

const Page = async ({ params }: { params: { collection: string } }) => {
  const localee = (await cookies()).get("NEXT_LOCALE")?.value;
  const { collection } = params;
    const { hadithDoaa } = await getMessages();
  

  const [hadithBooks, collectionInfo]: [
    HadithBook[] | null,
    CollectionInfo[] | null,
  ] = await Promise.all([
    fetchCollectionBooks(collection),
    fetchCollectionName(collection),
  ]);

  if (!hadithBooks || !collectionInfo) {
    return notFound();
  }

  return (
    <div className="inner-container mx-auto px-4 py-12">
      <div className=" mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-darkgrey dark:text-darkmode-lighttext">
            {collectionInfo?.filter((colLang) => colLang.lang === localee)[0]
              ?.title || "Unknown Collection"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {hadithDoaa.desc}
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hadithBooks.map((book, idx) => (
            <HadithBookCard
              key={idx}
              id={book.bookNumber}
              title={
                book.book.filter((colLang) => colLang.lang == localee)[0]
                  ?.name || "Unknown Book"
              }
              href={`${collection}/${book.bookNumber}`}
              type="collection"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
