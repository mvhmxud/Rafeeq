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
import { formatDate } from "@/utils/util";

interface LocationInterface {
  lat: number;
  long: number;
}

const Page = () => {
  const [location, setLocation] = useState<LocationInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<DayInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const today = new Date();
  const startDate = formatDate(today);
  const endDate = new Date();
  endDate.setDate(today.getDate() + 10);
  const endDateString = formatDate(endDate);

  const fetchData = async ({ lat, long }: LocationInterface) => {
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/calendar/from/${startDate}/to/${endDateString}?latitude=${lat}&longitude=${long}&method=2`
      );
      setPrayerTimes(res.data.data); // Store fetched data
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setError("Failed to fetch prayer times. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getUsersLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
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
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((permissionStatus) => {
        permissionStatus.onchange = () => {
          if (permissionStatus.state === "granted") {
            window.location.reload();
          }
        };
      });
    getUsersLocation();
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
      direction="horizontal"
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
