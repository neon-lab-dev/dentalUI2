"use client";
import React from "react";
import { ICONS } from "@/assets";
import Image from "next/image";

// Define types for the props
interface ServiceCardData {
  name: string;
  duration: string;
}

interface ServiceCardProps {
  service: ServiceCardData;
  isSelected: boolean;
  onCardSelect: () => void; // Callback function for selection
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onCardSelect }) => {
  return (
    <div
      className={`p-4 md:p-5 flex justify-between items-center shadow-sm transition-all duration-200 rounded-2xl xl:rounded-3xl w-full max-w-[507px] 
        ${isSelected ? "bg-[#FF7F50] border-black" : "bg-[#F5F5DC] border-transparent"} 
        hover:border-black cursor-pointer`}
      onClick={onCardSelect}
      aria-selected={isSelected}
    >
      <div className="flex flex-col justify-between">
        <div className="font-Amiri font-bold text-[20px] md:text-2xl xl:text-[32px] leading-7 xl:leading-[48px]">
          {service.name}
        </div>
        <div
          className={`h-[2px] my-[10px] self-stretch ${
            isSelected ? "bg-[#F5F5DC]" : "bg-[#FF7F50]"
          }`}
        ></div>
        <div className="font-Poppins text-[12px] md:text-[14px] xl:text-xl">
          Duration: {service.duration}
        </div>
      </div>
      <div className="w-5 md:w-6 xl:w-[82px]">
        <Image
          src={ICONS.rightblackarrow}
          alt="Right black arrow"
          layout="intrinsic"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
