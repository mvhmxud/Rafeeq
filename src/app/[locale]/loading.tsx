import SquareLoader from "@/Components/Ui/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="w-full min-h-[100vh] grid place-content-center">
      <SquareLoader />
    </div>
  );
};

export default loading;
