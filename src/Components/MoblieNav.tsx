"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import type { Formats, TranslationValues } from "next-intl"
import { Link } from "@/i18n/navigation"

interface MobileNavProps {
  isMenuOpened: boolean
  navItems: (
    | {
        label: string
        href: string
        onClick?: undefined
      }
    | {
        label: string
        href: string
        onClick: () => void
      }
  )[]
  setIsMenuOpened: (val: boolean) => void
  toggleTheme: () => void
  locale: string
  theme: string
  t: (key: string, values?: TranslationValues, formats?: Formats) => string
}
const MoblieNav: React.FC<MobileNavProps> = ({
  isMenuOpened,
  navItems,
  setIsMenuOpened,
  toggleTheme,
  t,
  theme,
}) => {
  return (
    <AnimatePresence>
      {isMenuOpened && (
        <motion.ul
          initial={{ y: -300 }}
          animate={{ y: 48 }}
          exit={{ y: -300 }}
          transition={{ type: "spring", bounce: 0 }}
          className="absolute lg:hidden dark:bg-zinc-800 dark:text-zinc-100 bg-zinc-50 rounded-b-3xl drop-shadow-sm z-[5] flex flex-col items-center gap-5 w-full p-5 font-medium"
        >
          {navItems.map(({ label, href, onClick }) => (
            <Link
              key={label}
              href={href}
              onClick={() => {
                setIsMenuOpened(false)
                onClick?.()
              }}
              className="w-full text-center p-2 hover:bg-lite-maingreen dark:hover:bg-zinc-900 transition-colors ease-in-out delay-75 rounded-md"
            >
              {label}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              setIsMenuOpened(false)
              toggleTheme()
            }}
            className="w-full text-center p-2 hover:bg-lite-maingreen dark:hover:bg-zinc-900 transition-colors ease-in-out delay-75 rounded-md"
          >
            {theme === "dark" ? t("NavBar.LightMode") : t("NavBar.DarkMode")}
          </button>
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

export default MoblieNav

