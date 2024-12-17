import React from "react";
import Link from "next/link";
import Button from "@/components/Buttons/Button";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";

interface ClinicLocationHeroProps {
  state:string
  title: string;
  subtitle: string;
}

const ClinicLocationHero: React.FC<ClinicLocationHeroProps> = ({
  state,
  title,subtitle
}) => {
  return (
    <div className="flex flex-col lg:flex-row  mb-10 gap-4 items-center lg:items-start   rounded-lg ">
      {/* Text Section */}
      <div className="lg:w-1/2 flex-col flex gap-4 md:gap-8  ">
        <h1 className="font-Amiri lg:text-[64px] lg:leading-[90px] md:text-[48px] md:leading-[64px] text-[36px] leading-[42px] font-bold text-center lg:text-start">
        Your Trusted Dental Care<br/> in {title}, {state} <br />
          
        </h1>
        <div className="flex gap-4">
          <Image src={ICONS.location} alt="" className="lg:size-6 md:size-5 size-4"/>
        <p className="font-Poppins lg:text-[22px] md:text-base text-xs font-normal text-center lg:text-start">
          {subtitle}
        </p>
        </div>
        
        <div className="flex justify-center lg:justify-start">
          <Link href={"/locations/schedule-appointment"}>
            <Button variant="Gradient">Schedule An Appointment!</Button>
          </Link>
        </div>
      </div>

      {/* Static Image Section */}
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <Image
          src={IMAGES.cityClinic} // Replace with your image path
          alt={`= Clinic`}
          className="rounded-3xl shadow-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ClinicLocationHero;
