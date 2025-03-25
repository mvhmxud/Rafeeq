import React from "react";
import NextPrayerCountdown from "./NextSalat";
import HijriDate from "./HijriDate";

const DetailsSection = () => {
  return (
    <div className="w-full md:w-[80%] flex flex-col md:flex-row mx-auto gap-4 ">
      <HijriDate />
      <NextPrayerCountdown />
    </div>
  );
};

export default DetailsSection;
