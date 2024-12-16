import React from "react";
import Image from "next/image";
import { ICONS } from "@/assets";

interface AppointmentCardProps {
  service: string;
  dateTime: string;
  location: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  service,
  dateTime,
  location,
}) => {
  const date = new Date(dateTime).toLocaleDateString();
  const time = new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F5F5DC] rounded-[20px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] border border-neutral-10 ">
      <div className="flex flex-col xl:flex-row xl:gap-20 gap-4 md:justify-between">
        <div className="flex gap-4 xl:order-1">
          <div className="flex-shrink-0">
            <Image
              src={ICONS.arrowUp}
              alt="Service"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg md:text-2xl text-black">{service}</h3>
          </div>
        </div>

        <div className="flex xl:flex-col xl:order-3 items-center justify-between">
          <h3 className="font-bold text-lg md:text-2xl text-black">Date & Time</h3>
          <p className="text-neutral-10 text-sm md:text-base">
            <span>{date}</span> <span>{time}</span>
          </p>
        </div>

        <div className="flex flex-col xl:order-2">
          <h3 className="font-bold text-lg md:text-2xl text-black">Location</h3>
          <p className="text-neutral-10 text-sm md:text-base">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
