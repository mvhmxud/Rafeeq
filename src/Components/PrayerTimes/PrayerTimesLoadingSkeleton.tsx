import React from "react";

const PrayerTimesSkeleton = () => {
  return (
    <div className="w-11/12 md:h-[100%] md:w-2/3 mx-auto">
      <div className="w-full text-center dark:bg-darkmode-light bg-white rounded-2xl drop-shadow-sm mt-16 p-5 grid place-items-center">
        <div className="md:text-2xl dark:text-white text-sm font-light md:mb-1 w-full">
          <div className="md:text-3xl mt-1 text-xl h-8 w-40 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="mt-1 h-6 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="text-xs mt-2 dark:text-white md:text-base flex gap-1 justify-center font-normal items-center h-6 w-full">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="flex gap-2 wrap mt-8">
        <div className="md:w-[33.33%] w-full bg-white flex flex-col gap-3 dark:bg-darkmode-light drop-shadow-sm h-24 rounded-2xl p-2 md:px-4">
          <div className="flex items-center h-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-2"></div>
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="text-center h-8 w-20 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse flex-grow"></div>
        </div>

        <div className="md:w-[33.33%] w-full bg-white flex flex-col gap-3 dark:bg-darkmode-light drop-shadow-sm h-24 rounded-2xl p-2 md:px-4">
          <div className="flex items-center h-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-2"></div>
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="text-center h-8 w-20 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse flex-grow"></div>
        </div>

        <div className="md:w-[33.33%] w-full bg-white flex flex-col gap-3 dark:bg-darkmode-light drop-shadow-sm h-24 rounded-2xl p-2 md:px-4">
          <div className="flex items-center h-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-2"></div>
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="text-center h-8 w-20 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse flex-grow"></div>
        </div>
      </div>

      <div className="flex gap-4 mb-16 flex-row md:flex-row mt-8">
        <div className="w-1/2 bg-white p-2 md:p-5 flex justify-between items-center dark:bg-darkmode-light drop-shadow-sm rounded-2xl h-24">
          <div className="flex items-center h-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-2"></div>
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>

        <div className="w-1/2 bg-white md:p-5 p-2 flex justify-between items-center dark:bg-darkmode-light drop-shadow-sm rounded-2xl h-24">
          <div className="flex items-center h-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-2"></div>
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesSkeleton;
