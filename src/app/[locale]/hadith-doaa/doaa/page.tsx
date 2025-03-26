"use client";

import { useState } from "react";

import { ArrowLeft } from "lucide-react";
import { Badge } from "@/Components/Ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Link } from "@/i18n/navigation";
import DoaaCard from "@/Components/Doaa/DoaaCard";

export const doaa_list = [
  {
    id: 1,
    Text: "اللَّهُمَّ أنَتَ رَبيِّ لَا إلِهَ إلِّا أنَتَ، خَلَقْتنَيِ وَأنَا عَبدكَ، وَأنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    Translation:
      "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins but You.",
  },
  {
    id: 2,
    Text: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ، وَجِلَّهُ، وَأَوَّلَهُ، وَآخِرَهُ، وَعَلَانِيَتَهُ، وَسِرَّهُ",
    Translation:
      "O Allah, forgive me all my sins, small and great, first and last, open and secret.",
  },
  {
    id: 3,
    Text: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّك أَنْتَ الْغَفُورُ الرَّحِيمُ.",
    Translation:
      "O Allah, I have wronged myself greatly, and none forgives sins but You, so forgive me with forgiveness from You and have mercy upon me. Surely, You are the Most Forgiving, the Most Merciful.",
  },
  {
    id: 4,
    Text: "رَبِّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي كُلِّهِ وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي، اللَّهُمَّ اغْفِرْ لِي خَطَايَايَ وَعَمْدِي وَجَهْلِي وَهَزْلِي، وَكُلُّ ذَلِكَ عِنْدِي،اللَّهُمَّ اغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ وَأَنْتَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
    Translation:
      "My Lord, forgive me for my sins, my ignorance, my immoderation in my affairs, and all that You know better than I. O Allah, forgive me my sins, those done intentionally, or out of ignorance, or in jest, for all these are from me. O Allah, forgive me what I have sent before me and what I have left behind, what I have concealed and what I have done openly. You are the One who brings forward and the One who puts back, and You are Able to do all things.",
  },
  {
    id: 5,
    Text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْجُبْن وَالْبُخْلِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ ",
    Translation:
      "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
  },
  {
    id: 6,
    Text: "اللَّهُمَّ إنِّي أَعُوذُ بك مِنَ الْبُخْلِ، وَأَعُوذُ بكَ مِنَ الْجُبْنِ، وَأَعُوذُ بكَ أَنْ أُرَدَّ إلَى أَرْذَلِ الْعُمُرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ.",
    Translation:
      "O Allah, I seek refuge in You from miserliness, and I seek refuge in You from cowardice, and I seek refuge in You from being returned to the worst of old age, and I seek refuge in You from the trials of this world, and I seek refuge in You from the punishment of the grave.",
  },
  {
    id: 7,
    Text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَأْثَمِ وَالْمَغْرَمِ، وَمِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ، وَمِنْ شَرِّ فِتْنَةِ الْغِنَى، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْفَقْرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ، اللَّهُمَّ اغْسِلْ عَنِّي خَطَايَايَ بِمَاءِ الثَّلْجِ وَالْبَرَدِ، وَنَقِّ قَلْبِي مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ، وَبَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ.",
    Translation:
      "O Allah, I seek refuge in You from laziness and senility, from sin and debt, from the trial of the grave and the punishment of the grave, from the trial of the Fire and the punishment of the Fire, and from the evil of the trial of wealth. I seek refuge in You from the trial of poverty, and I seek refuge in You from the trial of the False Messiah. O Allah, wash away my sins with the water of snow and hail, and cleanse my heart from sin as a white garment is cleansed from filth, and put a great distance between me and my sins, as great as the distance You have made between the East and the West.",
  },
  {
    id: 8,
    Text: "اللَّهُمَّ رَبَّ السَّمَوَاتِ وَرَبَّ الْأَرْضِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتهِ، اللَّهُمَّ أَنْتَ الْأوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ،وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ",
    Translation:
      "O Allah, Lord of the heavens and Lord of the earth and Lord of the Mighty Throne, our Lord and the Lord of all things, Splitter of the grain and the date-stone, Revealer of the Torah, the Gospel and the Criterion (Quran), I seek refuge in You from the evil of every thing that You seize by the forelock. O Allah, You are the First, and there is nothing before You; You are the Last, and there is nothing after You. You are the Manifest, and there is nothing above You; You are the Hidden, and there is nothing beyond You. Settle our debt and spare us from poverty.",
  },
  {
    id: 9,
    Text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ ",
    Translation:
      "O Allah, I seek refuge in You from the evil of what I have done and from the evil of what I have not done.",
  },
  {
    id: 10,
    Text: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ ",
    Translation:
      "O Allah, set right for me my religion, which is the safeguard of my affairs. And set right for me my worldly affairs, wherein is my living. And set right for me my Hereafter, to which is my return. And make life for me a means of increase in all good, and make death a relief for me from all evil.",
  },
  {
    id: 11,
    Text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    Translation:
      "O Allah, I ask You for guidance, piety, chastity and contentment.",
  },
  {
    id: 12,
    Text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَالْهَرَمِ وَعَذَابِ الْقَبْرِ، اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا، اللَّهُمَّ إنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ، وَمِنْ قَلْبٍ لَا يَخْشَعُ، وَمِنْ نَفْسٍ لَا تَشْبَعُ، وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا ",
    Translation:
      "O Allah, I seek refuge in You from incapacity, laziness, cowardice, miserliness, decrepitude and the torment of the grave. O Allah, grant my soul its piety and purify it, for You are the Best of those who purify it. You are its Guardian and Master. O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that does not fear, from a soul that is not satisfied, and from a supplication that is not answered.",
  },
];

export default function DoaaPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 py-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <Link
            href="/hadith-doaa"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-maingreen dark:hover:text-maingreen mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>العودة إلى الصفحة السابقة</span>
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-darkgrey dark:text-darkmode-lighttext">
              الأدعية المأثورة
            </h1>
            <Badge
              variant="outline"
              className="bg-maingreen/5 text-maingreen border-maingreen/20"
            >
              {doaa_list.length} دعاء
            </Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {activeIndex + 1} / {doaa_list.length}
          </span>
        </div>

        <div className="">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="stacked-cards-swiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            cardsEffect={{
              slideShadows: false,
              perSlideRotate: 2,
              perSlideOffset: 8,
            }}
          >
            {doaa_list.map((dua) => (
              <SwiperSlide key={dua.id}>
                <DoaaCard id={dua.id} text={dua.Text} translation={dua.Translation} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Swipe Instruction */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>اسحب لليمين أو لليسار للتنقل بين الأدعية</p>
          <p className="text-xs mt-1">
            (Swipe right or left to navigate between duas)
          </p>
        </div>
      </div>
    </div>
  );
}
