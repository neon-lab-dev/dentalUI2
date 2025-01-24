import { ICONS } from "@/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface LocationCardDetails {
  _id: string;
  img: StaticImageData;
  name: string;
  numberOfClinic: string;
}

interface ConvenientDentalCareCardProps {
  details: LocationCardDetails;
}

const ConvenientDentalCareCard = ({ details }: ConvenientDentalCareCardProps) => {
  return (
    <div className="relative overflow-hidden group cursor-pointer rounded-3xl max-w-[824px] max-h-[230px] md:max-h-[600px]">
      {/* Image */}
      <Image
        src={details.img}
        alt="animated_card"
        className="w-full max-h-[600px] object-cover"
      />

      {/* Text */}
      <div className="absolute md:top-[42%] top-[46%] transform group-hover:translate-y-[-10%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-start justify-center flex-col p-12">
        <div>
          <h1 className="text-white capitalize md:text-[48px] text-[19px] font-bold leading-normal md:leading-[66px] font-Amiri">
            {details.name}
          </h1>
          <p className="z-[-1] md:opacity-0 md:group-hover:z-20 md:group-hover:opacity-100 md:transition-all md:duration-700 text-white font-Poppins text-[9px] ">
            {details.numberOfClinic}
          </p>
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/locations/${details.name.replace(/\s+/g, "-").toLowerCase()}`}
        className="z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 absolute bottom-[10%] right-[-50%] transform group-hover:right-[5%] transition-all duration-500 bg-white text-primary-10 lg:px-11 lg:py-4  px-5 py-2 font-Poppins lg:text-[22px] text-[9px] font-semibold rounded-[55px] flex items-center gap-3"
      >
        See All
        <Image
          src={ICONS.rightArrowOrange}
          alt="right-arrow"
          className="lg:size-6 size-[9px]"
        />
      </Link>

      {/* Bottom Shadow */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-full bg-convenient-dental-care opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

      <div className="absolute bottom-0 left-0 right-0 w-full h-[110px] bg-convenient-dental-care opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
    </div>
  );
};

export default ConvenientDentalCareCard;
