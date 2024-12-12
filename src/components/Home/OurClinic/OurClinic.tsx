import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Heading from "@/components/shared/Heading/Heading";
import Image from "next/image";

const OurClinic = () => {
//   const clinicImages = [
//     IMAGES.clinic1,
//     IMAGES.clinic2,
//     IMAGES.clinic3,
//     IMAGES.clinic4,
//   ];
  return (
    <div className="lg:flex flex flex-col lg:flex-row items-center  gap-[80px]">
      <div className="lg:order-2 flex flex-col lg:item-start lg:items-start">
        <Heading
          subHeading={"OUR CLINICS"}
        
          classNames={""}
          aligned={"Left"}
          headingWidth={"max-w-[618px]"}
          isHeadingCenter={false}
        >
          Visit <span className="text-primary-10">Our Modern</span>,
          Conveniently Located Clinics
        </Heading>

        <p className="text-neutral-10 font-Poppins lg:text-xl md:text-base text-xs  max-w-[893px] w-fit flex-1 mt-8">
          With state-of-the-art facilities and a caring team, our clinics are
          designed for your comfort and convenience. Find the nearest location
          and schedule your visit today.
        </p>

        <div className="mt-[60px]">
          <Button variant="Filled" classNames="flex justify-center text-xs md:text-base lg:text[20px] px-[50px] py-4 lg:w-fit  w-full mx-auto">
            Learn More
            <Image
              src={ICONS.arrowUpWhite}
              alt="arrow-up"
              className="lg:size-[22px] md:size-4 size-3"
            />
          </Button>
        </div>
      </div>
      <Image
        src={IMAGES.clinic}
        alt="Clinic image"
        className={`w-full max-w-[692pxpx] 2xl:max-w-[824px] object-cover lg:order-1 rounded-3xl max-h-[940px] 2xl:max-h-[831px]`}
      />

      
      {/* <div className="grid grid-cols-2 gap-8">
        {clinicImages.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt="Clinic image"
              className={`w-[300px] object-cover rounded-3xl ${
                index === 1 || index === 2 ? "h-[459px]" : "h-[340px]"
              }`}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default OurClinic;
