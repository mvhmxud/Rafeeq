import { formatDate, getSecondsUntilNextDay } from "@/utils/util";
import { Calendar } from "lucide-react";
import React from "react";

async function getHijriDate() {
  "use server";
  const revalidateSeconds = getSecondsUntilNextDay();
  try {
    const today = new Date();
    const res = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${formatDate(today)}`,
      {
        next: { revalidate: revalidateSeconds },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Hijri date");
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Hijri Date API Error:", error);
    return null;
  }
}

const HijriDate = async () => {
  const date = await getHijriDate();
  if (!date)
    return (
      <div className=" inner-container mx-auto rounded-2xl p-6 bg-whitesomke dark:bg-zinc-800 shadow-md flex flex-col items-center justify-center gap-2 text-red-600 uppercase">
        Failed to get date
      </div>
    );
  return (
    <div className=" inner-container mx-auto rounded-2xl p-6 bg-whitesomke dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light dark:bg-zinc-800 shadow-md flex flex-col items-center justify-center gap-2">
      <div className="flex gap-2 text-2xl font-bold text-maingreen items-center">
        <Calendar />
        <span className="ltr:hidden">التقويم الهجري</span>
        <span className="rtl:hidden">Hijri Date</span>
      </div>
      <div className="text-2xl dark:text-white self-center flex gap-2">
        <span className="ltr:hidden">{date.hijri.weekday.ar}</span>
        <span className="rtl:hidden">{date.gregorian.weekday.en}</span>,
        <span>{date.hijri.day}</span>
        <span className="rtl:hidden">{date.hijri.month.en}</span>
        <span className="ltr:hidden">{date.hijri.month.ar}</span>
        <span>{date.hijri.year}</span>
        <span className="rtl:hidden">{date.hijri.designation.abbreviated}</span>
        <span className="ltr:hidden">هـ</span>
      </div>
    </div>
  );
};

export default HijriDate;
