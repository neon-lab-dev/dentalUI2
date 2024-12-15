"use client";
import React,{useState} from "react";
import LocationData from "./LocationCard/LocationData";
import DateTimeSelector from "./DateTimeSelector/DateTimeSelector";
import { LocationProvider } from "./LocationContext";

interface LocationProps {
  goToNextStep: () => void; // Callback function for proceeding to the next step
}
const Location: React.FC<LocationProps> = ({ goToNextStep }) =>{
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null); // State for selected clinic ID
  return (
    <div className="flex flex-col items-center">

      {/* Content Container */}
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl md:rounded-[32px] xl:rounded-[48px] w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm">
        {/* Progress Bar */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 ${
                index < 3 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
              }`}
            ></div>
          ))}
        </div>

        {/* Select Location */}
        <h2 className="font-Amiri font-bold text-center text-[32px] md:text-4xl lg:text-5xl font-bold leading-10 md:leading-[44px] lg:leading-[66px]">
          Select Location
        </h2>
        <LocationProvider>
        <LocationData setSelectedSubClinicId={setSelectedClinicId} />
        </LocationProvider>

        {/* Select Date and Time */}
        <h2 className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]">
          Select Date and Time
        </h2>
        <div className="w-full">
          <DateTimeSelector goToNextStep={goToNextStep} selectedSubClinicId={selectedClinicId} />
        </div>
      </div>
    </div>
  );
};

export default Location;
