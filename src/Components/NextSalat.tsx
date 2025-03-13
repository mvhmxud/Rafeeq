"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { MapPin, Moon, Sun, Sunrise, Sunset } from "lucide-react"

interface Prayer {
  name: string
  arabicName: string
  time: string ;
  icon: React.ReactNode
}

export default function NextPrayerCountdown() {
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null)
  const [remainingTime, setRemainingTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)

  const prayers: Prayer[] = [
    { name: "Fajr", arabicName: "صلاة الفجر", time: "04:38", icon: <Sunrise className="h-6 w-6 text-maingreen" /> },
    { name: "Dhuhr", arabicName: "صلاة الظهر", time: "12:00", icon: <Sun className="h-6 w-6 text-maingreen" /> },
    {
      name: "Asr",
      arabicName: "صلاة العصر",
      time: "15:22",
      icon: <Sun className="h-6 w-6 text-maingreen rotate-45" />,
    },
    { name: "Maghrib", arabicName: "صلاة المغرب", time: "17:56", icon: <Sunset className="h-6 w-6 text-maingreen" /> },
    { name: "Isha", arabicName: "صلاة العشاء", time: "19:13", icon: <Moon className="h-6 w-6 text-maingreen" /> },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()

      const currentMinutes = now.getHours() * 60 + now.getMinutes()

      let nextPrayerIndex = -1
      let minDiff = Number.POSITIVE_INFINITY

      prayers.forEach((prayer, index) => {
        const [hours, minutes] = prayer.time.split(":").map(Number)
        const prayerMinutes = hours * 60 + minutes
        let diff = prayerMinutes - currentMinutes
        if (diff < 0) diff += 24 * 60
        if (diff < minDiff && diff > 0) {
          minDiff = diff
          nextPrayerIndex = index
        }
      })

      if (nextPrayerIndex === -1) nextPrayerIndex = 0

      setNextPrayer(prayers[nextPrayerIndex])

      const [hours, minutes] = prayers[nextPrayerIndex].time.split(":").map(Number)
      const prayerTime = new Date(now)
      prayerTime.setHours(hours, minutes, 0, 0)

      if (prayerTime < now) {
        prayerTime.setDate(prayerTime.getDate() + 1)
      }

      const diff = prayerTime.getTime() - now.getTime()
      const remainingHours = Math.floor(diff / (1000 * 60 * 60))
      const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000)

      setRemainingTime({
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!nextPrayer || !remainingTime) return  <div className=' inner-container mx-auto rounded-2xl p-6 bg-white dark:bg-zinc-800 shadow-md flex flex-col items-center justify-center gap-2 h-56 animate-pulse '></div>

  return (
    <div className=" inner-container mx-auto rounded-2xl p-6 bg-white dark:bg-zinc-800 shadow-md h-56">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          {nextPrayer.icon}
          <h2 className="text-2xl font-bold text-maingreen">{nextPrayer.arabicName}</h2>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الوقت المتبقي</p>
          <div className="flex justify-center gap-4 text-3xl font-bold">
            <div className="flex flex-col items-center">
              <span className="text-darkmode-light dark:text-darkmode-lighttext" >{remainingTime.hours.toString().padStart(2, "0")}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">ساعة</span>
            </div>
            <span className="text-darkmode-light dark:text-darkmode-lighttext" >:</span>
            <div className="flex flex-col items-center">
              <span className="text-darkmode-light dark:text-darkmode-lighttext" >{remainingTime.minutes.toString().padStart(2, "0")}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">دقيقة</span>
            </div>
            <span className="text-darkmode-light dark:text-darkmode-lighttext" >:</span>
            <div className="flex flex-col items-center">
              <span className="text-darkmode-light dark:text-darkmode-lighttext" >{remainingTime.seconds.toString().padStart(2, "0")}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">ثانية</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Africa/Cairo</span>
        </div>
      </div>
    </div>
  )
}

