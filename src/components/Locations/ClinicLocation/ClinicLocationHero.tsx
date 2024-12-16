import React from "react";
import Link from "next/link";
import Button from "@/components/Buttons/Button";
import { IMAGES } from "@/assets";
import Image from "next/image";

interface ClinicLocationHeroProps {
  stateName: string; // City name passed dynamically
}

const ClinicLocationHero: React.FC<ClinicLocationHeroProps> = ({
  stateName,
}) => {
  return (
    <div className="flex flex-col lg:flex-row  gap-4 items-center lg:items-start   rounded-lg ">
      {/* Text Section */}
      <div className="lg:w-1/2 flex-col flex gap-4 md:gap-8  ">
        <h1 className="font-Amiri lg:text-[64px] lg:leading-[90px] md:text-[48px] md:leading-[64px] text-[36px] leading-[42px] font-bold text-center lg:text-start">
          {stateName} <br />
          <span className="font-semibold">Dental Clinic</span>
        </h1>
        <p className="font-Poppins lg:text-[22px] md:text-base text-xs font-normal text-center lg:text-start">
          Exceptional Dental Care in the Heart of {stateName}.
        </p>
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
          alt={`${stateName} Clinic`}
          className="rounded-3xl shadow-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ClinicLocationHero;
