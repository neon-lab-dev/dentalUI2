import React from "react";
import Image from "next/image";
import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Heading from "@/components/shared/Heading/Heading";
const Journey = () => {
  return (
    <div className="flex flex-col-reverse items-center lg:flex-row flex-col gap-10 mt-[120px] overflow-hidden ">
      <div className="lg:w-[50%] w-[100%]">
        {" "}
        <Image
          src={IMAGES.journey}
          alt="Journey image"
          className={`rounded-3xl flex justify-center`}
        />
      </div>
      <div className="lg:w-[50%] w-[100%]">
        <div> 
          <Heading
            subHeading={""}
            classNames={" w-full "}
            aligned={"left"} 
            headingWidth={"w-full"}
            isHeadingCenter={true}
          >
            A Journey of <span className="text-primary-10"> Care</span> and{" "}
            <span className="text-primary-10"> Excellence</span>
          </Heading>

          <p className="text-neutral-10 font-Poppins text-xs lg:text-xl md:text-base max-w-[744px] w-full flex-1 mt-8">
            Founded with a commitment to compassionate care and advanced
            dentistry, [Your Dental Practice Name] has been transforming smiles
            and building lasting patient relationships from day one. Our story
            is rooted in a passion for improving oral health and making every
            patient feel valued.
          </p>
        </div>
        <div className="lg:mt-[60px] md:mt-12 mt-8">
          <Button variant="Outlined" classNames="px-[50px] py-4 xl:w-fit w-full">
            Learn More
            <Image src={ICONS.arrowUp} alt="arrow-up" className="size-[22px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Journey;
