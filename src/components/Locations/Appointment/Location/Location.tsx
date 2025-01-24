"use client";
import React, { useState } from "react";
import LocationData from "./LocationCard/LocationData";
import DateTimeSelector from "./DateTimeSelector/DateTimeSelector";
import { LocationProvider } from "./LocationContext";
import { AppointmentData } from "@/types/appointment";

interface LocationProps {
  goToNextStep: () => void; // Callback function for proceeding to the next step
  goToPreviousStep: () => void; // Callback function for proceeding to the previous step
  updateAppointmentData: (field: keyof AppointmentData, value: string | number) => void; // Callback to update appointment data
  onClinicSelect: (clinicId: string, state: string, city: string, address: string) => void;
}

const Location: React.FC<LocationProps> = ({ goToNextStep, goToPreviousStep, updateAppointmentData, onClinicSelect }) => {
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null); // State for selected clinic ID
  
  const handleClinicSelection = (clinicId: string, state: string, city: string, address: string) => {
    setSelectedClinicId(clinicId);
    onClinicSelect(clinicId, state, city, address);
    updateAppointmentData("state", state);
    updateAppointmentData("city", city);
    updateAppointmentData("address", address);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Content Container */}
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl md:rounded-[32px] xl:rounded-[48px] w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm">
        {/* Progress Bar */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 ${index < 3 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"}`}
            ></div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={goToPreviousStep}
          className="self-start text-[#FF7F50] hover:text-[#ff6937] font-Poppins text-lg"
        >
          ← Back to Services
        </button>

        {/* Select Location */}
        <h2
          className="font-Amiri text-center text-[32px] md:text-4xl lg:text-5xl leading-10 md:leading-[44px] lg:leading-[66px]"
        >
          Select Location
        </h2>
        <LocationProvider>
          <LocationData setSelectedSubClinicId={handleClinicSelection} />
        </LocationProvider>

        {/* Select Date and Time */}
        {selectedClinicId && (
          <>
            <h2
              className="font-Amiri text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]"
            >
              Select Date and Time
            </h2>
            <div className="w-full">
              <DateTimeSelector
                goToNextStep={goToNextStep}
                selectedSubClinicId={selectedClinicId}
                updateAppointmentData={updateAppointmentData}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Location;
