"use client"

import type React from "react"

import useToggleLanguage from "@/Hooks/ChangeLanguage"
import { useTranslations, useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IoClose, IoMenu, IoMoon, IoSunny } from "react-icons/io5"
import { useThemeStore } from "@/store/store"
import MoblieNav from "./MoblieNav"
import { Link as IntlLink } from "@/i18n/navigation"

const NavBar: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [lang, toggleLang] = useToggleLanguage()
  const { theme, toggleTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const navItems = [
    { label: t("NavBar.Home"), href: "/" },
    { label: t("NavBar.ContactUS"), href: "/contact-us" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col mb-10">
      <div className="h-12 bg-whitesomke dark:bg-zinc-800 dark:drop-shadow-md drop-shadow-sm px-7 lg:px-16 z-10">
        <div className="h-12 text-lg flex container justify-between items-center mx-auto">
          <IntlLink href="/" className="font-semibold text-maingreen dark:text-zinc-200">
            {t("title")}
          </IntlLink>

          <ul className="gap-12 hidden lg:flex dark:text-zinc-100 ">
            {navItems.map(({ label, href }) => (
              <IntlLink className="hover:text-maingreen" key={label} href={href}>
                {label}
              </IntlLink>
            ))}

            <button
              onClick={toggleLang}
              className="dark:text-zinc-100 bg-transparent transition-all ease-in-out cursor-pointer hover:text-maingreen"
            >
              {t("NavBar.Language")}
            </button>

            <motion.button
              onClick={toggleTheme}
              className="cursor-pointer text-2xl dark:text-zinc-100 bg-transparent transition-all ease-in-out hover:text-maingreen"
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
      <MoblieNav
        isMenuOpened={isMenuOpened}
        navItems={navItems}
        setIsMenuOpened={setIsMenuOpened}
        t={t}
        locale={locale}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  )
}

export default NavBar

