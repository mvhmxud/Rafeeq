import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/Components/Ui/pagination";

import { ChevronRight, ChevronLeft } from "lucide-react";

interface PagintaionProps {
  currentPage: number;
  next: number | null;
  prev: number | null;
}

const HadithPagination: React.FC<PagintaionProps> = ({
  currentPage,
  next,
  prev,
}) => {
  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-3">
        {prev && (
          <>
            {" "}
            <PaginationItem
              className="flex items-center gap-2 cursor-pointer px-3 py-1.5 text-sm font-medium 
rounded-lg transition-all duration-200 ease-in-out
bg-gray-100 dark:bg-darkmode-light hover:bg-maingreen hover:text-white 
dark:hover:bg-maingreen dark:hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </PaginationItem>
            <PaginationItem
              className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 
hover:bg-gray-200 dark:hover:bg-darkmode-dark rounded-lg transition-all duration-200"
            >
              1
            </PaginationItem>{" "}
          </>
        )}
        <PaginationItem
          className="px-3 py-1.5 text-sm font-semibold text-white bg-maingreen 
rounded-lg transition-all duration-200 shadow-md"
        >
          {currentPage}
        </PaginationItem>
        {next && (
          <>
            <PaginationItem
              className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 
hover:bg-gray-200 dark:hover:bg-darkmode-dark rounded-lg transition-all duration-200"
            >
            {next}
            </PaginationItem>

            <PaginationItem
              className="flex items-center gap-2 cursor-pointer px-3 py-1.5 text-sm font-medium 
rounded-lg transition-all duration-200 ease-in-out
bg-gray-100 dark:bg-darkmode-light hover:bg-maingreen hover:text-white 
dark:hover:bg-maingreen dark:hover:text-white"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default HadithPagination;
