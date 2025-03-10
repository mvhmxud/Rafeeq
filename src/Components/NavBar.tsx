"use client";

import useToggleLanguage from "@/Hooks/ChangeLanguage";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import { useThemeStore } from "@/store/store";
import MoblieNav from "./MoblieNav";

const NavBar: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [lang, toggleLang] = useToggleLanguage();
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();

  const navItems = [
    { label: t("NavBar.Home"), href: "/" },
    { label: t("NavBar.ContactUS"), href: "/contact-us" },
    { label: t("NavBar.Language"), href: "/", onClick: toggleLang },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define Nav Items

  return (
    <div className="flex flex-col mb-10">
      <div className="h-12 bg-whitesomke dark:bg-zinc-800 dark:drop-shadow-md drop-shadow-sm px-7 lg:px-16 z-10">
        <div className="h-12 text-lg flex container justify-between items-center mx-auto">
          <Link href="/" className="font-semibold text-maingreen dark:text-zinc-200">
            {t("title")}
          </Link>

          <ul className="gap-12 hidden lg:flex dark:text-zinc-100">
            {navItems.map(({ label, href, onClick }) => (
              <Link key={label} href={href} onClick={onClick}>
                {label}
              </Link>
            ))}

            <motion.button
              onClick={toggleTheme}
              className="text-2xl dark:text-zinc-100 bg-transparent transition-all ease-in-out"
            >
              {mounted ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                    {theme !== "dark" ? <IoMoon /> : <IoSunny />}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <IoSunny size={20} className="opacity-0" />
              )}
            </motion.button>
          </ul>

          <motion.button
            onClick={() => setIsMenuOpened((prev) => !prev)}
            className="block lg:hidden text-2xl dark:text-zinc-100 transition-all"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpened ? "close-icon" : "menu-icon"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                {isMenuOpened ? <IoClose /> : <IoMenu />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav */}
     <MoblieNav isMenuOpened={isMenuOpened} navItems={navItems} setIsMenuOpened={setIsMenuOpened} t={t} theme={theme} toggleTheme={toggleTheme}/>
    </div>
  );
};

export default NavBar;
