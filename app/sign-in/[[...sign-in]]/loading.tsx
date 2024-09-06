"use client";

import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/Animation - 1725535015177.json"; // ضع المسار الصحيح هنا

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        height={300}
        width={300}
      />
    </div>
  );
};

export default Loading;
