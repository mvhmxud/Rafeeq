import SquareLoder from "@/Components/Ui/Loader";
import React from "react";

const loading = () => {
  return  <div className="w-full min-h-[100vh] grid place-content-center">
  <SquareLoder />;
  </div>
};

export default loading;
