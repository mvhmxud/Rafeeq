import Image from "next/image";
import img1 from "../../public/main1.png";
import { useTranslations } from "next-intl";
import { FlipWords } from "./Ui/FilippingWord";

const HeroBanner = () => {
  const t = useTranslations();
  return (
    <div className="w-[80%]  mx-auto rounded-lg  bg-whitesomke drop-shadow-sm lg:h-64  dark:bg-zinc-800 flex flex-col lg:flex-row lg:justify-between items-center p-5 ">
      <div className="order-2 lg:order-1 dark:text-zinc-50  text-pretty text-xl lg:text-3xl text-center font-semibold ">
          أحصل على 
          <FlipWords
          className="text-maingreen"
            words={[t("HeroBanner.Quran"), t("HeroBanner.PrayerTimes")]}
          />
        {/* {t("HeroBanner.ListenTo")}{" "}
        <span className="text-maingreen">{t("HeroBanner.Quran")}</span> <br />{" "}
        {t("HeroBanner.ByYour")}{" "}
        <span className="text-maingreen">
          {t("HeroBanner.FavouriteReciters")}
        </span>{" "}
        {t("HeroBanner.More")} */}
      </div>
      <div className=" order-1 lg:order-2 lg:h-72  ">
        <Image
          alt="thankfull muslim"
          placeholder="empty"
          priority
          height={250}
          className="-translate-y-3"
          src={img1}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
