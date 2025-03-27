import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { getMessages } from "next-intl/server";

export default async function NotFound() {
  const { notFound } = await getMessages();
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-maingreen/10 flex items-center justify-center">
            <FileQuestion className="h-12 w-12 text-maingreen" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-darkgrey dark:text-darkmode-lighttext">
          {notFound.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {notFound.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-maingreen hover:bg-maingreen/90 text-white"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {notFound.backToHome}
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>{notFound.error}</p>
        </div>
      </div>
    </div>
  );
}
