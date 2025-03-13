import React from "react";
import img from '../../../public/location.png'
import Image from "next/image";
const LocationPremission = () => {
  return (
    <div className="">
      <div className="  w-11/12 md:w-1/2 flex drop-shadow-sm mt-20  flex-col justify-center items-center mx-auto rounded-2xl dark:bg-darkmodeLight p-5   md:mt-16 bg-white">
        <Image alt="man holding location" src={img} className="w-96  -mt-24" />
        <div className="md:text-2xl text-center  text-darkgrey dark:text-white ">
          يرجي اعطاء اذن الوصول للموقع لمعرفة مواقيت الصلاة
          <div className="text-center text-maingreen text-xs md:text-sm">
            سيتم تحديث الصفحة تلقائياَ بعد إعطاء الإذن
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPremission;
