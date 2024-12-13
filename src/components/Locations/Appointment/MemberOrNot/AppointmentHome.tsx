"use client";
import { useState } from "react";
import Button from "@/components/Buttons/Button";
import React from "react";

// Define the type for the props, including the goToNextStep function
interface AppointmentHomeProps {
  goToNextStep: () => void; // Type for the goToNextStep function
}

const AppointmentHome: React.FC<AppointmentHomeProps> = ({ goToNextStep }) => {
  const [selectedBtn, setSelectedBtn] = useState<string | null>(null);

  const handleBtnClick = (btnType: string) => {
    setSelectedBtn((prev) => (prev === btnType ? null : btnType));
    goToNextStep(); // Call the next step function passed from parent
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-12 md:py-12 py-6 px-4 md:px-8 xl:px-12 w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm rounded-2xl md:rounded-[32px] xl:rounded-[48px]">
        {/* Progress Bar */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 ${
                index === 0 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
              }`}
            ></div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center font-Amiri text-[32px] md:text-4xl lg:text-5xl font-bold leading-10 md:leading-[44px] lg:leading-[66px] my-12 md:my-20 xl:my-0">
          Have you been to Dentist Clinic before?
        </div>

        {/* Buttons */}
        {[{
          type: "New",
          title: "No, I have never been to Dentist Clinic",
          subtitle: "I am a new user!"
        },
        {
          type: "Returning",
          title: "Yes, I have been to Dentist Clinic",
          subtitle: "I have a dentist clinic Account"
        }].map((btn) => (
          <Button
            key={btn.type}
            variant={selectedBtn === btn.type ? "Filled" : "Outlined"}
            onClick={() => handleBtnClick(btn.type)}
            classNames={`w-full lg:w-[670px] h-[73px] md:h-[100px] xl:h-[120px] px-[60px] xl:px-[102px] py-[10px] rounded-[79px] font-Amiri text-base md:text-2xl lg:text-[32px] flex flex-col justify-center items-center gap-[4px] md:gap-0 ${
              selectedBtn === btn.type ? "text-black" : ""
            }`}
          >
            <div className="leading-6 md:leading-9">{btn.title}</div>
            <div className="font-Poppins text-xs md:text-[16px] xl:text-xl font-normal">
              {btn.subtitle}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHome;
