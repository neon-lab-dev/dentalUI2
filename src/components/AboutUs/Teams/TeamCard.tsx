import { IMAGES } from "@/assets";
import Image from "next/image";
import React from "react";

const TeamCard = () => {
  return (
    <div>
      <Image
        src={IMAGES.teamsimg}
        alt="Card Image"
        className="rounded-[32px] max-w-[216px]  min-w-[216px] md:min-w-[316px] md:max-w-[360px]"
      />
      <div className="lg:opacity-0 transition-all duration-300 mt-6 xl:hover:opacity-100">
        <h1 className="font-Amiri md:text-4xl text-2xl font-bold">John Doe</h1>
        <p className="font-Poppins md:text-base text-xs">Senior Dentist</p>
      </div>
    </div>
  );
};

export default TeamCard;
