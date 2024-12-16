import { IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface ClinicCardsProps {
  city: string;
  clinic_id: string;
}

const ClinicCards: React.FC<ClinicCardsProps> = ({ city, clinic_id }) =>  {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-96 overflow-hidden rounded-3xl shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 hover:bg-[#FF7F50]/50 z-10 transition-all duration-300"></div>

      {/* Card Image */}
      <Image
        src={IMAGES.cityClinic} // Replace with your actual image path
        alt={city}
        layout="fill"
        objectFit="cover"
        className="filter transition-all duration-300 hover:grayscale-0"
      />

      {/* Button */}
      <div>
        <Link href={`/locations/clinic/${clinic_id}`}>
        <Button
          variant={isHovered ? "Filled2" : "Filled"}
          classNames="absolute bottom-6 left-0 right-0 z-20 m-4"
        >
          {city} {/* City name on the button */}
        </Button></Link>
        
      </div>
    </div>
  );
};

export default ClinicCards;
