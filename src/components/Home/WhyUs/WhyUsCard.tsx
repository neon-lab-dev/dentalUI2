/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "@/assets";
import Image from "next/image";
import React from "react";

type TWhyUsCard = {
  info: {
    title: string;
    description: string;
    icon: any;
  };
};
const WhyUsCard: React.FC<TWhyUsCard> = ({ info }) => {
  return (
    <div className="rounded-3xl border border-secondary-20 shadow-md  md:h-[316px] h-[200px] max-w-[340px]  min-w-[172px] w-full p-6">
      <button className="md:p-6 sm:-4 p-3 rounded-full bg-primary-10">
        <Image src={ICONS.care} alt="phone-icon" className="sm:size-7 size-5" />
      </button>

      <h1 className="text-neutral-15 md:text-[28px] sm:text-[24px]  text-base font-bold md:leading-[32px] sm:leading-6  leading-4 font-Amiri mt-2 m:dmt-8">
        {info.title}
      </h1>
      <p className="text-neutral-10 font-Poppins text-xs lg:text-xl sm:text-base mt-2 2xl:mt-4">
        {info.description}
      </p>
    </div>
  );
};

export default WhyUsCard;
