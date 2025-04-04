import img2 from "../../public/img2.png";
import img4 from "../../public/ramadan.png";
import { HTMLAttributes, JSX } from "react";
import { twMerge } from "tailwind-merge";
import { FaBookQuran } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { GiPrayer } from "react-icons/gi";
import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/i18n/navigation";
import { IoIosRadio } from "react-icons/io";

interface KeyFeaturesCardProps {
  href: string;
  text: string;
  bgColor?: HTMLAttributes<HTMLElement>["className"];
  textColor?: HTMLAttributes<HTMLElement>["className"];
  imgSrc?: any;
  icon?: JSX.Element;
  className?: HTMLAttributes<HTMLElement>["className"];
}

const KeyFeaturesCard: React.FC<KeyFeaturesCardProps> = ({
  href,
  text,
  icon,
  className,
}) => {
  return (
    <IntlLink
      href={href}
      className={twMerge(
        `w-full rounded-3xl font-semibold text-darkgrey dark:text-darkmode-lighttext overflow-hidden h-48 mx-auto mt-5 px-5 flex items-center justify-between drop-shadow-md bg-whitesomke dark:bg-gradient-to-br dark:from-darkmode-light dark:to-darkmode-dark border-gray-200 dark:border-darkmode-light transition-colors ease-in-out duration-200 delay-75 text-center`,
        className
      )}
    >
      <div className={`text-sm md:text-lg lg:text-xl `}>{text}</div>
      {icon && icon}
    </IntlLink>
  );
};

const KeyFeatures: React.FC = () => {
  "use client";
  const t = useTranslations("KeyFeatures");
  return (
    <section className="inner-container mx-auto">
      <div className="flex flex-col items-center w-full mx-auto text-center ">
        <h1 className="md:ml-2 rtl:text-right text-center md:text-left text-2xl font-bold capitalize text-maingreen">
          {t("title")}
        </h1>
        <p className="text-darkmode-dark dark:text-darkmode-lighttext">
          {t("desc")}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-3  ">
        <KeyFeaturesCard
          href="/quran"
          text={t("Quran")}
          icon={
            <FaBookQuran className=" text-9xl scale-125 rtl:left-2 ltr:right-0 absolute -rotate-12 opacity-10 dark:text-darkmode-lighttext" />
          }
        />

        <KeyFeaturesCard
          href="/prayer-times"
          text={t("PrayerTimes")}
          bgColor="bg-maingreen"
          textColor="text-whiste"
          imgSrc={img2}
          icon={
            <MdLocationPin className=" text-9xl scale-125 rtl:left-2 ltr:right-0 absolute -rotate-12 opacity-10 dark:text-darkmode-lighttext" />
          }
        />

        <KeyFeaturesCard
          href="/radio"
          text={t("nearstMasjid")}
          imgSrc={img4}
          icon={
            <IoIosRadio className=" text-9xl scale-125 rtl:left-2 ltr:right-0 absolute -rotate-12 opacity-10 dark:text-darkmode-lighttext" />
          }
        />
        <KeyFeaturesCard
          href="/hadith-doaa"
          text={t("AzkarDoaa")}
          imgSrc={img4}
          className="lg:col-span-full"
          icon={
            <GiPrayer className=" text-9xl scale-125 rtl:left-2 ltr:right-0 absolute -rotate-12 opacity-10 dark:text-darkmode-lighttext" />
          }
        />
      </div>
    </section>
  );
};

export default KeyFeatures;
