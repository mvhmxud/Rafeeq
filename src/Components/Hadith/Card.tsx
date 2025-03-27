import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/Components/Ui/card";
import { BookText, BookOpen, FileText } from "lucide-react";
import { AbstractIntlMessages } from "next-intl";

type HadithCardProps = {
  id: string | number;
  title: string;
  href: string;
  type: "collection" | "book" | "hadith";
};

export function HadithCard({ title, href, type}: HadithCardProps) {
  const Icon =
    type === "collection" ? BookOpen : type === "book" ? BookText : FileText;

  return (
    <Link href={href} className="block">
      <Card className="h-full bg-white dark:bg-gradient-to-br  dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen dark:hover:border-maingreen hover:shadow-maingreen/10 cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="flex flex-col lg:flex-row  justify-center lg:justify-normal items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-maingreen/10 text-maingreen flex items-center justify-center lg:mr-4 flex-shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          <h3
            title={title}
            className="text-md md:text-lg text-center font-medium text-darkgrey dark:text-darkmode-lighttext mb-1 lg:truncate"
          >
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
