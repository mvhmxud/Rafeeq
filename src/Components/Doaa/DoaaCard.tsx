import React, { useState } from "react";
import { Card, CardContent } from "@/Components/Ui/card";
import { Button } from "@/components/ui/button";
import { HandIcon as PrayingHands, Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface DoaaCardProps {
  id: number;
  text: string;
  translation: string;
}

const DoaaCard: React.FC<DoaaCardProps> = ({ id, text, translation }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const t = useTranslations("hadithDoaa.doaa")

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <Card className="bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen/50 transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 ">
            <div className="w-10 h-10 rounded-full bg-maingreen/10 text-maingreen flex items-center justify-center mr-3 flex-shrink-0">
              <PrayingHands className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t("doaaNumber")} {id}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-maingreen/10 text-gray-500 dark:text-gray-400 hover:text-maingreen flex items-center justify-center transition-all cursor-pointer"
            onClick={() => copyToClipboard(text, id)}
          >
            {copiedId === id ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-darkgrey dark:text-darkmode-lighttext text-lg leading-relaxed text-right">
            {text}
          </p>

          <div className=" text-left pt-4 border-t border-gray-200 dark:border-darkmode-light">
            <h4 className="text-sm font-medium text-maingreen mb-2">
              Translation
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {translation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoaaCard;
