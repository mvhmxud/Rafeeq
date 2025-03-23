import { Search } from "lucide-react";
import React from "react";
import { Input } from "./Ui/input";

interface searchInputProps {
  value: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}
const SearchInput: React.FC<searchInputProps> = ({
  handler,
  value,
  placeHolder,
}) => {
  return (
    <div className="relative mb-10 max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeHolder}
        className="pl-10 py-6 bg-gray-100 dark:bg-darkmode-light border-gray-200 dark:border-darkmode-light text-darkgrey dark:text-darkmode-lighttext rounded-xl"
        value={value}
        onChange={handler}
      />
    </div>
  );
};

export default SearchInput;
