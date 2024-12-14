"use client";
import React, { useState } from "react";

interface Clinic {
  _id: string;
  city:string;
  address: string;
}

interface ClinicCardProps {
  clinics: Clinic[];
  onSubCardSelect: (id: string | null) => void;
}


const ClinicCard: React.FC<ClinicCardProps> = ({ clinics, onSubCardSelect }) => {
    const [selectedSubCard, setSelectedSubCard] = useState<string | null>(null);
  
    const handleSubCardClick = (id: string) => {
      const newSelectedId = selectedSubCard === id ? null : id; // Toggle selection
      setSelectedSubCard(newSelectedId);
      onSubCardSelect(newSelectedId); // Pass the selected ID to the parent
    };
  return (
    <div>
      <div className="flex xl:flex-row flex-col xl:gap-8 gap-5 mt-6">
          {clinics.map((card) => (  
            <div
              key={card._id}
              onClick={() => handleSubCardClick(card._id)}
              className={`relative overflow-hidden group cursor-pointer rounded-3xl w-full ${
                selectedSubCard === card._id ? "bg-[#FF7F50]" : "bg-[#F5F5DC]"
              }`}
            >
              <div className="w-full h-full xl:px-8 xl:py-6 md:p-5 p-4">
                <h1 className="text-black capitalize xl:text-[32px] md:text-[32px] text-[16px] font-bold  xl:leading-[66px] md:leading-[30px] leading-6 font-Amiri">
                  {card.city}
                </h1>
                <div className="h-[2px] bg-[#FF7F50] self-stretch my-[10px]"></div>
                <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px] ">
                {card.address}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ClinicCard
