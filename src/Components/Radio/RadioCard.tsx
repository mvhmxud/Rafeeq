"use client";
import React from "react";
import { Card, CardContent } from "@/Components/Ui/card";
import Image from "next/image";
import { UseTunez } from "tunez";

interface RadioProps {
  id: number;
  img: string;
  name: string;
  url: string;
}

const RadioCard: React.FC<RadioProps> = ({ id, img, name, url }) => {
  const { playTrack } = UseTunez();
  return (
    <Card
      key={id}
      onClick={() =>
        playTrack({
          author: "Rafeeq App",
          src: url,
          title: name,
          thumbnail: img,
        })
      }
      className="bg-white dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light hover:border-maingreen dark:hover:border-maingreen hover:shadow-maingreen/10 cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-maingreen/10 flex-shrink-0 mb-3">
            <Image
              fill
              sizes="80px"
              src={img || "/placeholder.svg"}
              alt={name}
              className="object-cover transition-opacity"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="text-center">
            <h3 className="text-md font-medium text-darkgrey dark:text-darkmode-lighttext mb-1 line-clamp-2 text-center">
              {name}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadioCard;
