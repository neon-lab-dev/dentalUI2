/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";

// Define prop type for LocationCard
interface LocationCardProps {
  details: any;
  onMainCardClick: () => void;
  isMainCardSelected: boolean;
}

const LocationCard = ({ details, onMainCardClick, isMainCardSelected }: LocationCardProps) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        {/* Main Card */}
        <div
          onClick={onMainCardClick} 
          className={`relative overflow-hidden group cursor-pointer rounded-3xl mb-4 ${
            isMainCardSelected ? "bg-blue-500" : ""
          }`}
        >
          <Image
            src={details.img}
            alt="animated_card"
            className="xl:w-[372px] md:w-[282px] w-[156px] xl:h-[258px] md:h-[196px] h-[106px] object-cover"
          />

          {isMainCardSelected && (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FF7F50]  to-[#FF7F50] opacity-80 z-20"></div>
          )}

          <div className="absolute top-0 left-0 w-full h-full shadow-sm bg-gradient-to-b from-transparent to-[#F5F5DC] opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-10"></div>

          <div className="absolute top-[12%] transform group-hover:translate-y-[-10%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col md:p-12">
            <h1 className="text-black capitalize lg:text-[42px] md:text-[24px] text-[16px] font-bold leading-normal 2xl:leading-[66px] font-Amiri">
              {details.name}
            </h1>
            <p className="z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-black font-Poppins text-[22px]">
              {details.numberOfClinic}
            </p>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default LocationCard;
