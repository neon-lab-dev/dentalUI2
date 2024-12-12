import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Heading from "@/components/shared/Heading/Heading";
import Image from "next/image";
import ServiceCard from "./ServiceCard";
import { ourServices } from "./ourService.data";

const OurServices = () => {
  return (
    <div className="">
      {/* Heading */}
      <div className="lg:flex  items-center justify-between w-full">
        <div className="flex-1">
          <Heading
            subHeading={"OUR SERVICES"}
            classNames={""}
            aligned={"Left"}
            headingWidth={"max-w-[500px] 2xl:max-w-[656px]"}
            isHeadingCenter={false}
          >
            <span className="text-primary-10">
              Expert Dental Care
            </span>
            <span >
              {" "}for Every Stage of Life
            </span>
          </Heading>
        </div>
        <p className="text-neutral-10 font-Poppins mt-4 lg:text-xl md:text-base text-xs max-w-[893px] w-full flex-1">
          We offer personalized treatments, including cleanings, fillings,
          comdetic dentistry, and more. Whatever your dental needs, we’ve got
          you covered.
        </p>
      </div>

      {/* Cards */}
      <div className="lg:flex  gap-8 mt-[60px] ">
        <div className="rounded-3xl border border-secondary-20 shadow-lg h-fit lg:h-[806px]">
          <Image
            src={IMAGES.patient}
            alt="patient-img"
            className="object-cover  lg:h-[483px] md:h-[322px] h-[230px] w-full rounded-3xl lg:rounded-t-3xl "
          />
          <div className="p-6">
            <h1 className="text-neutral-15 text-xl font-Amiri md:text-[28px] lg:text-[32px] font-bold lg:leading-[40px] md:leading-[30px] leading-[22px] ">
              First Visit to Dentologie
            </h1>
            <p className="text-neutral-10 font-Poppins text-xs lg:text-xl md:text-base mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae
              nunc sollicitudin
            </p>

            <Button
              variant="Outlined"
              classNames="px-2 md:py-4  mt-[30px] text-center flex justify-center w-full lg:w-[260px] 2xl:mt-[56px] text-xs md:text-base lg:text[20px]  "
            >
              Learn More
              <Image
                src={ICONS.arrowUp}
                alt="arrow-up"
                className="lg:size-[22px] md:size-4 size-3"
              />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:gap-8 gap-4 mt-4 lg:mt-0">
          {ourServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
