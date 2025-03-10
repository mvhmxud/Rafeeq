import Link from "next/link";
import Image from "next/image";
import { FaQuran } from "react-icons/fa";
import img2 from "../../public/img2.png";
import img4 from "../../public/ramadan.png";
import { HTMLAttributes, JSX } from "react";

interface QuickLinkCardProps {
  href: string;
  text: string;
  bgColor?: HTMLAttributes<HTMLElement>["className"];
  textColor?: HTMLAttributes<HTMLElement>["className"];
  imgSrc?: any;
  icon?: JSX.Element;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  href,
  text,
  bgColor = "bg-white dark:bg-darkmode-light",
  textColor = "text-darkgrey dark:text-darkmode-lighttext ",
  imgSrc,
  icon,
}) => {
  return (
    <Link
      href={href}
      className={`w-full rounded-3xl   overflow-hidden h-48 mx-auto mt-5 px-5 flex items-center justify-between drop-shadow-md ${bgColor}`}
    >
      <div className={`text-sm md:text-xl w-2/3 ${textColor}`}>{text}</div>
      {icon && <div className="translate-x-6 scale-150">{icon}</div>}
      {imgSrc && (
        <div className="md:w-1/2 scale-150 w-2/4 flex justify-center">
          <Image alt="" fill className="translate-y-5" src={imgSrc} />
        </div>
      )}
    </Link>
  );
};

const QuickLink: React.FC = () => {
  return (
    <section className="mt-10 w-[80%] mx-auto">
      <div>
        <h1 className="md:ml-2 rtl:text-right text-center md:text-left text-2xl font-medium text-maingreen">
          <span className="arabic">الوصول السريع</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3  ">
        {/* Quran Link */}
        <QuickLinkCard
          href="/Quran"
          text="استمع إلى القرآن الكريم بصوت قرائك المفضلين"
          icon={
            <FaQuran className="rtl:md:ml-0 rtl:md:mr-20 md:ml-20 ml-5 text-8xl -rotate-12 opacity-10 dark:text-darkmode-lighttext" />
          }
        />

        <QuickLinkCard
          href="/PrayerTimes"
          text="معرفة مواقيت الصلاة حسب موقعك الجغرافي"
          bgColor="bg-maingreen"
          textColor="text-white"
          imgSrc={img2}
        />
      </div>

      <QuickLinkCard
        href="/supplications"
        text="اكتشف مجموعة من الأدعية والأحاديث النبوية الموثوقة في مكان واحد"
        textColor="text-white"
        imgSrc={img4}
      />
    </section>
  );
};

export default QuickLink;
