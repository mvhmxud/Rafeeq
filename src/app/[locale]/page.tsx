import React from "react";
import HeroBanner from "../../Components/HeroBanner";
import QuranVerse from "@/Components/QuranVerse";
import DetailsSection from "@/Components/DetailsSection/DetailsSection";
import KeyFeatures from "@/Components/KeyFeatures";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-5">
      <HeroBanner />
      <DetailsSection />
      <KeyFeatures />
      <QuranVerse />
    </div>
  );
}
