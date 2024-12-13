import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import React from "react";

const Newsletter = () => {
 

  return (
    <div
      className="rounded-3xl px-10 2xl:px-[100px] py-[100px] 2xl:py-[148px] flex flex-col lg:flex-row justify-between items-center gap-[20px] 2xl:gap-[58px] relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255, 127, 80, 0.00) 0%, #D04B1A 100%), url(${IMAGES.newsletter.src})`,
      }}
    >
      <div className="flex flex-col gap-8 z-10">
        <h1 className="text-neutral-15 font-Amiri text-[24px] text-center lg:text-start md:text-[36px] lg:text-[48px] font-bold lg:leading-[40px] md:leading-[30px] leading-[22px] max-w-[500px] 2xl:max-w-[681px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
        </h1>
        <p className="text-neutral-10 font-Poppins text-xs md:text-base text-center lg:text-start lg:text-xl max-w-[500px] 2xl:max-w-[681px]">
          Explore our blog for the latest insights on dental health, treatments,
          and tips to keep your mdile healthy. Stay updated with expert advice
          from our team.
        </p>
      </div>

      <div className="relative w-full max-w-[500px] 2xl:max-w-[741px] z-10"> {/* Add z-index for form */}
        <input
          type="text"
          placeholder="Enter Email ID"
          className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[691px] 2xl:max-w-[741px] lg:text-[32px]  md:text-2xl  text-base  lg:leading-[48px] focus:outline-none bg-white lg:py-[18px] lg:pr-[250px]  md:py-4 md:pr-[200px]  py-4 pr-[150px] md:pl-8 pl-4 rounded-[61px]"
        />
        <button className="lg:px-[50px] lg:py-4  md:px-9 md:py-4 px-6 py-2 w-fit lg:h-[65px] md:h-[56px] h-[48px] flex items-center gap-3 bg-secondary-10 lg:text-[22px] md:text-base text-sx font-semibold rounded-[55px] absolute lg:top-2 lg:bottom-0 lg:right-3 md:top-1 md:bottom-0 md:right-2 top-1 bottom-0 right-1">
          Submit
          <Image
            src={ICONS.arrowUpBlack}
            alt="arrow-up"
            className="lg:w-[22px] md:w-4 w-3"
          />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
