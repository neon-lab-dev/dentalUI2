"use client";
import React, { useState } from "react";
import ServiceCard from "./ServiceCard";

// Define the service type
interface ServiceType {
  id: number;
  name: string;
  duration: string;
}

// Define the props for the Service component
interface ServiceProps {
  goToNextStep: () => void; // Callback function for proceeding to the next step
}

const services: ServiceType[] = [
  { id: 1, name: "Invisalign", duration: "40 minutes" },
  { id: 2, name: "Teeth Whitening", duration: "30 minutes" },
  { id: 3, name: "Dental Cleaning", duration: "45 minutes" },
  { id: 4, name: "Braces Consultation", duration: "20 minutes" },
  { id: 5, name: "Root Canal", duration: "60 minutes" },
];

const Service: React.FC<ServiceProps> = ({ goToNextStep }) => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleCardSelect = (service: ServiceType) => {
    setSelectedService(service.id);
    goToNextStep();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm">
        {/* Progress Bar */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 ${
                index < 2 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
              }`}
            ></div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center font-Amiri text-[32px] md:text-4xl lg:text-5xl font-bold leading-10 md:leading-[44px] xl:leading-[66px] my-8">
          What service are you visiting for?
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 xl:gap-8 w-full">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isSelected={selectedService === service.id}
              onCardSelect={() => handleCardSelect(service)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
