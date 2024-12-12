import React from "react";

import Image from "next/image";
import { ICONS } from "@/assets";
const Statement = () => {
  return (
    <div className="bg-[#FF7F50] rounded-[32px] px-4 md:px-8 xl:px-[60px] 2xl:px-[120px] md:my-[193px] py-8 px-4 relative  ">
      <Image
        src={ICONS.openinvertedcomma}
        alt="open inverted comma"
        className="absolute xl:w-[105px] xl:h-[69px] md:w-12 md:h-[31px] w-[36px] h-[23px]  md:left-12 md:top-12 left-6 top-6"
      />
      <div className="md:py-12 py-8">
        {" "}
        <div className="font-Amiri lg:text-5xl md:text-4xl text-2xl font-bold lg:leading-[66px] md:leading-[44px] leading-9 text-white text-center xl:pt-[61px] pt-8  xl:px-[206px]">
          As the CEO of [Your Dental Practice Name], my goal has always been to
          create a welcoming environment where every patient feels cared for and
          confident in their smile. Our dedicated team is committed to providing
          exceptional dental care through innovation, compassion, and
          personalized service. We believe that every smile tells a story, and
          it’s our privilege to be a part of yours.
        </div>
        <div className="md:w-[620px] h-[2px] bg-[#ADD8E6] mx-auto my-[24px]"></div>
        <div className=" text-center font-Amiri lg:text-5xl md:text-4xl text-2xl font-bold lg:leading-[66px] md:leading-[44px] leading-9 md:pb-[61px] pb-8">
          -A Message from Our CEO
        </div>
      </div>

      <Image
        src={ICONS.closedinvertedcomma}
        alt="closed inverted comma"
        className="xl:w-[105px] xl:h-[69px] md:w-12 md:h-[31px] w-[36px] h-[23px] absolute md:right-12 md:bottom-12 right-6 bottom-6  "
      />
    </div>
  );
};

export default Statement;
