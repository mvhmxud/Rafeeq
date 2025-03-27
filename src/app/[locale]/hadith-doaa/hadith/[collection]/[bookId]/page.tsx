import { ArrowLeft } from "lucide-react";
import { Badge } from "@/Components/Ui/badge";
import HadithDetailsCard, {
  HadithEntry,
} from "@/Components/Hadith/HadithDetailsCard";
import { cookies } from "next/headers";
import { Link } from "@/i18n/navigation";
import { Collection } from "../../page";
import HadithPagination from "@/Components/Hadith/hadithPagination";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

interface Book {
  lang: string;
  name: string;
}

interface HadithResponse {
  data: HadithEntry[];
  limit: number;
  next: number;
  previous: number;
  total: number;
}

const fetchCollectionsBookHadiths = async (
  collectionName: string,
  bookNumber: number,
  page?: number
) => {
  try {
    const headers: HeadersInit = {
      "X-API-Key": process.env.SUNNAH_API_KEY ?? "",
    };
    const res = await fetch(
      `${process.env.SUNNAH_API_BASE_URL}/collections/${collectionName}/books/${bookNumber}/hadiths/?page=${page || 1}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error while fetching Hadiths:", error);
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
    return collection.length ? collection : null;
  } catch (error) {
    console.error("Error while fetching collection name:", error);
    return null;
  }
};

const fetchCollectionBookName = async (
  collectionName: string,
  bookId: number
) => {
  try {
    const headers: HeadersInit = {
      "X-API-Key": process.env.SUNNAH_API_KEY ?? "",
    };
    const res = await fetch(
      `${process.env.SUNNAH_API_BASE_URL}/collections/${collectionName}/books/${bookId}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    );
    if (!res.ok) return null;
    const { book } = await res.json();
    return book.length ? book : null;
  } catch (error) {
    console.error("Error while fetching book name:", error);
    return null;
  }
};

export default async function HadithsPage({
  params,
  searchParams,
}: {
  params: { collection: string; bookId: number };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const localee = (await cookies()).get("NEXT_LOCALE")?.value;
  const searchParam = await searchParams;
  const page = searchParam.page ? Number(searchParam.page) : 1;
  const { collection, bookId } = await params;
  const { hadithDoaa } = await getMessages();

  const [hadithList, collectionDetails, books]: [
    HadithResponse | null,
    Collection[] | null,
    Book[] | null,
  ] = await Promise.all([
    fetchCollectionsBookHadiths(collection, bookId, page),
    fetchCollectionName(collection),
    fetchCollectionBookName(collection, bookId),
  ]);

  if (!hadithList || !collectionDetails || !books) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <Link
            href={`/hadith-doaa/hadith/${collection}`}
            className="inline-flex gap-2 items-center text-gray-500 dark:text-gray-400 hover:text-maingreen dark:hover:text-maingreen mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>
              {hadithDoaa.hadith.back}{" "}
              {collectionDetails.find((col) => col.lang === localee)?.title ??
                "Unknown Collection"}
            </span>
          </Link>

          <div className="text-center mb-10">
            <div className="text-sm text-maingreen mb-2">
              {collectionDetails.find((col) => col.lang === localee)?.title ??
                "Unknown Collection"}
            </div>
            <h1 className="text-3xl font-bold mb-4 text-darkgrey dark:text-darkmode-lighttext">
              {books.find((book) => book.lang === localee)?.name ??
                "Unknown Book"}
            </h1>
            <Badge
              variant="outline"
              className="bg-maingreen/5 text-maingreen border-maingreen/20"
            >
              {hadithDoaa.hadith.hadith}
            </Badge>
          </div>

          <div className="space-y-5">
            {hadithList.data.map((hadit, idx) => (
              <HadithDetailsCard
                collection={
                  collectionDetails.find((col) => col.lang === localee)
                    ?.title ?? "Unknown Collection"
                }
                locale={localee || "ar"}
                key={idx}
                hadithEntry={hadit}
              />
            ))}
          </div>
        </div>
      </div>
      <div dir="ltr">
        {hadithList.previous || hadithList.next ? (
          <HadithPagination
            currentPage={page}
            next={hadithList.next}
            prev={hadithList.previous}
          />
        ) : null}
      </div>
    </div>
  );
}
