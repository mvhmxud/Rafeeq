import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const useToggleLanguage = (): [string, () => void] => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.replace({ pathname }, { locale: newLocale });
  };

  return [locale, switchLanguage];
};

export default useToggleLanguage;
