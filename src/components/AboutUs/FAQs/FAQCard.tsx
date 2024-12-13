"use client";
import { useState } from "react";
import { ICONS } from "@/assets";
import Image from "next/image";

const FAQCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
 
  return (
    <div
      className={`relative  w-full md:rounded-[32px] rounded-2xl flex justify-between transition-all duration-300 ease-in-out md:px-12 p-4 md:p-8 py-4 md:py-[58px] border border-[#00000040]  self-stretch  ${
        isExpanded
          ? "xl:h-[200px] md:h-[228px]  md:w-full  p-4 md:p-8 w-full bg-white flex-col justify-center  border border-orange-500 "
          : "xl:h-[178px] md:h-[112px] h-16  items-center md:w-full"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <div className="font-Amiri md:text-4xl lg:text-5xl text-2xl font-bold ">
            Lorem ipsum dior sit. ispel
          </div>
 
          <div className="flex flex-col flex-grow  ">
            {isExpanded && (
              <div className="md:mt-6 md:mb-8 xl:mt-4  xl:text-xl md:text-[16px] text-[12px] font-Poppins xl:w-[1180px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                dapibus sodales felis. Suspendisse non bibendum velit.
                Vestibulum sed maximus orci. Nunc odio mauris, tincidunt sit
                amet dui nec, auctor sodales nisi. E
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="absolute xl:bottom-12 xl:right-12 flex flex-col items-center right-1 md:right-12  xl:size-[82px] md:size-[48px] size-8 "
        >
          <Image
            src={isExpanded ? ICONS.blackminus : ICONS.blackplus}
            alt="Toggle Icon"
          />
        </button>
      </div>
    </div>
  );
};

export default FAQCard;
