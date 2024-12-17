"use client";
import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Image from "next/image";

const ServiceSection = () => {
  return (
    <div className="pt-[63px] w-full overflow-hidden max-w-screen">
      <div className="rounded-3xl relative max-h-[836px] w-full">
        {/* Background Image */}
        <Image
          src={IMAGES.service_bg}
          alt="blog-hero"
          className="w-full h-[620px]  object-cover"
        />

        {/* Content Overlay */}
        <div className=" w-full  h-full absolute top-0 bottom-0  lg:p-16 pb-10 pl-11 2xl:pl-[90px] flex flex-col lg:justify-center justify-center">
          {/* Hero Title */}

          <h1 className="font-Amiri text-secondary-30 lg:text-[48px] lg:leading-[66px] md:text-[36px] md:leading-[44px] text-[32px] leading-[40px] text-center mb-5">
            Comprehensive Dental Services for a Healthy, Beautiful Smile
          </h1>
          <div className="flex justify-center">
            <Button variant="Filled2" classNames="">
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
