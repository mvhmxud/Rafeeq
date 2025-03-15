import Image from "next/image";
import img1 from "../../public/main1.png";
import { useTranslations } from "next-intl";
import { FlipWords } from "./Ui/FilippingWord";

const HeroBanner = () => {
  const t = useTranslations();
  
  return (
    <div className="inner-container overflow-hidden mx-auto rounded-lg bg-whitesomke drop-shadow-sm lg:h-64 dark:bg-zinc-800 flex flex-col lg:flex-row lg:justify-between items-center p-5">
      <div className=" order-2 lg:order-1 flex flex-col items-center justify-center gap-1 flex-1/2 dark:text-zinc-50 text-pretty text-lg lg:text-3xl text-center font-semibold w-full">
        <span className="">{t("HeroBanner.MainMessage")}</span>
        <div className="w-full flex justify-center overflow-hidden ">
          <FlipWords
            className="text-maingreen self-center dark:text-maingreen md:w-auto whitespace-nowrap"
            words={[
              t("HeroBanner.Quran"),
              t("HeroBanner.PrayerTimes"),
              t("HeroBanner.nearstMasjid"),
              t("HeroBanner.AzkarDoaa"),
            ]}
          />
        </div>
      </div>
      <div className="order-1 lg:order-2 lg:h-72">
        <Image
          alt="thankful muslim"
          placeholder="empty"
          priority
          height={250}
          className=""
          src={img1}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
