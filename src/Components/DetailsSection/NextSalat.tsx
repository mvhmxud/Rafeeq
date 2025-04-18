"use client";
import { formatDate } from "@/utils/util";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import SquareLoder from "../Ui/Loader";
import { useTranslations } from "next-intl";

type PrayerTimings = { [key: string]: string };

type NextPrayer = {
  name: string;
  time: string;
};

let timezone: string;
const getNextPrayer = async (): Promise<PrayerTimings> => {
  try {
    const locationRes = await fetch("https://ipapi.co/json/", {
      cache: "force-cache",
    });
    const location = await locationRes.json();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ALADHAN_API_URL_v1}/nextPrayer/${formatDate(new Date())}?latitude=${location.latitude}&longitude=${location.longitude}$method=5`
    );
    const prayerData = await res.json();
    timezone = prayerData.data.meta.timezone;
    return prayerData.data?.timings;
  } catch (error) {
    console.error("Error while fetching next prayer:", error);
    return {};
  }
};

const calculateRemainingTime = (prayerTime: string): number => {
  const now = new Date();
  const [hours, minutes] = prayerTime.split(":").map(Number);
  const prayerDateTime = new Date();
  prayerDateTime.setHours(hours, minutes, 0, 0);
  if (prayerDateTime < now) {
    prayerDateTime.setDate(prayerDateTime.getDate() + 1);
  }
  return Math.floor((prayerDateTime.getTime() - now.getTime()) / 1000);
};

export default function NextPrayerCountdown() {
  const t = useTranslations("NextPrayer");
  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({
    name: "",
    time: "",
  });
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const timings = await getNextPrayer();
      const nextPrayerName = Object.keys(timings)[0];
      const nextPrayerTime = timings[nextPrayerName];
      console.log(calculateRemainingTime(nextPrayerTime));
      setNextPrayer({ name: nextPrayerName, time: nextPrayerTime });
      setRemainingTime(calculateRemainingTime(nextPrayerTime));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  if (!nextPrayer.name)
    return (
      <div className="inner-container mx-auto rounded-2xl p-6 bg-white dark:bg-zinc-800 shadow-md h-56 animate-pulse grid place-content-center">
        <SquareLoder />
      </div>
    );
  return (
    <div className="inner-container mx-auto rounded-2xl p-6 bg-whitesomke dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light dark:bg-zinc-800 shadow-md h-56">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-maingreen">{nextPrayer.name}</h2>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {t("remainingTime")}
          </p>
          <div className="flex justify-center gap-4 text-3xl font-bold rtl:flex-row-reverse">
            <div className="flex flex-col items-center">
              <span className="text-darkmode-light dark:text-darkmode-lighttext font-mono w-10 text-center">
                {String(hours).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("hours")}
              </span>
            </div>
            <span className="text-darkmode-light dark:text-darkmode-lighttext">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="text-darkmode-light dark:text-darkmode-lighttext font-mono w-10 text-center">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("minutes")}
              </span>
            </div>
            <span className="text-darkmode-light dark:text-darkmode-lighttext">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="text-darkmode-light dark:text-darkmode-lighttext font-mono w-10 text-center">
                {String(seconds).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("seconds")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{timezone}</span>
        </div>
      </div>
    </div>
  );
}
