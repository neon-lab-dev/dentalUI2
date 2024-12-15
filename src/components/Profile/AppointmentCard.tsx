import React from "react";
import Button from "../Buttons/Button";
import Image from "next/image";
import { ICONS } from "@/assets";

const AppointmentCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F5F5DC] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] border border-neutral-10 ">
      {/* Content Wrapper */}
      <div className="flex flex-col xl:flex-row xl:gap-20 gap-4 md:justify-between ">
        {/* Image Section */}
        <div className="flex gap-4  xl:order-1">
          <div className="flex-shrink-0">
            <Image
              src="https://via.placeholder.com/80" // Replace with the actual image URL
              alt="Service"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
           
          </div>
          {/* Service Details */}
          <div>
            <h3 className="font-bold text-lg font-Amiri md:text-2xl text-black">Service</h3>
            <p className="text-neutral-10 text-sm md:text-base font-normal">
              Emergency Exam
            </p>
          </div>
        </div>

        {/* Date & Time Section */}
        <div className="flex xl:flex-col  xl:order-3 items-center justify-between">
          <h3 className="font-bold text-lg font-Amiri md:text-2xl text-black">Date & Time</h3>
          <p className="text-neutral-10 text-sm md:text-base font-normal">
           <span> 22 Dec, 2024</span>
           
           <span> 11:00 PM</span>
          </p>
        </div>

        {/* Location Section */}
        <div className="flex flex-col md:flex-1 xl:order-2" >
          <h3 className="font-bold text-lg font-Amiri md:text-2xl text-black">Location</h3>
          <p className="text-neutral-10 text-sm md:text-base font-normal">
            <span className="inline-flex items-center gap-1">
            <Image src={ICONS.location} alt="" className="xl:size-6 size-4 " />
              45-12 21st Street, Long Island City, NY 11101
            </span>
          </p>
        </div>
      </div>

      {/* Reschedule Button */}
      <div className="mt-4 flex justify-center ">
        <Button
          variant="Filled"
          classNames="w-full xl:w-fit"
        >
          Reschedule
          <Image
            src={ICONS.arrowUpWhite}
            alt="arrow-up"
            className="w-4 h-4 ml-2"
          />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;
