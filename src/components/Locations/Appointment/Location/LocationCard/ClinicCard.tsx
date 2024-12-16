"use client";
import React, { useState } from "react";

interface Clinic {
  _id: string;
  city: string;
  address: string;
  state: string;
}

interface ClinicCardProps {
  clinics: Clinic[];
  onSubCardSelect: (clinicId: string, state: string, city: string, address: string) => void; // Accept 4 parameters
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinics, onSubCardSelect }) => {
  const [selectedSubCard, setSelectedSubCard] = useState<Clinic | null>(null); // Fixed the state initialization

  const handleSubCardClick = (id: string) => {
    const selectedClinic = clinics.find((clinic) => clinic._id === id); // Find the selected clinic by id
    setSelectedSubCard(selectedClinic || null); // Update the selectedSubCard state
    
    if (selectedClinic) {
      onSubCardSelect(
        selectedClinic._id,
        selectedClinic.state,
        selectedClinic.city,
        selectedClinic.address
      );
    }
  };

  return (
    <div>
      <div className="flex xl:flex-row flex-col xl:gap-8 gap-5 mt-6">
        {clinics.map((card) => (
          <div
            key={card._id}
            onClick={() => handleSubCardClick(card._id)}
            className={`relative overflow-hidden group cursor-pointer rounded-3xl w-full ${
              selectedSubCard?._id === card._id ? "bg-[#FF7F50]" : "bg-[#F5F5DC]"
            }`}
          >
            <div className="w-full h-full xl:px-8 xl:py-6 md:p-5 p-4">
              <h1 className="text-black capitalize xl:text-[32px] md:text-[32px] text-[16px] font-bold xl:leading-[66px] md:leading-[30px] leading-6 font-Amiri">
                {card.city}
              </h1>
              <div className="h-[2px] bg-[#FF7F50] self-stretch my-[10px]"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px]">
                {card.address}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicCard;
