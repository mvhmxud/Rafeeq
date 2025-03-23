"use client";

import { useEffect, useState } from "react";
import PrayerTimesCard, { DayInterface } from "@/Components/PrayerTimesCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LocationPremission from "@/Components/PrayerTimes/LocationPremission";
import PrayerTimesSkeleton from "@/Components/PrayerTimes/PrayerTimesLoadingSkeleton";
import axios from "axios";

export interface LocationInterface {
  lat: number;
  long: number;
}

const Page = () => {
  const [location, setLocation] = useState<LocationInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<DayInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const today = new Date();
  const dayOfMonthIndex = today.getDate() - 1;

  const fetchData = async ({ lat, long }: LocationInterface) => {
    try {
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ALADHAN_API_URL}/${year}/${month}?latitude=${lat}&longitude=${long}&method=5`
      );
      setPrayerTimes(res.data.data);
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setError("Failed to fetch prayer times. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = (loc: LocationInterface) => {
    localStorage.setItem("userLocation", JSON.stringify(loc));
    setLocation(loc); 
  };

  const getUsersLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        saveLocation(loc);
      },
      (err) => {
        if (err.code === 1) {
          setError(
            "Location permission denied. Please enable location services and refresh."
          );
        } else {
          setError("Failed to retrieve location. Please try again.");
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");

    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    } else {
      getUsersLocation();
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchData(location);
    }
  }, [location]);

  if (error) return <LocationPremission />;
  if (loading || !prayerTimes) return <PrayerTimesSkeleton />;

  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      slidesPerView={1}
      initialSlide={dayOfMonthIndex}
    >
      {prayerTimes.map((day, idx) => (
        <SwiperSlide key={idx}>
          <PrayerTimesCard day={day} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Page;
