import Heading from "@/components/shared/Heading/Heading";
import React from "react";
import TeamCard from "./TeamCard";

const Teams = () => {
  return (
    <div className="flex items-center flex-col gap-10 mt-[120px] overflow-hidden">
      <div className="flex flex-col md:gap-8 gap-4 w-full max-w-[1276px]">
        <Heading
          subHeading={""}
          classNames={""}
          aligned={"Center"}
          headingWidth={"w-full"}
          isHeadingCenter={true}
        >
          Meet the <span className="text-primary-10">Experts</span> Behind Your
          Smile
        </Heading>
        <p className="font-Poppins md:text-xl text-[12px] font-[400] text-center">
          Our skilled and compassionate team of dental professionals is
          dedicated to providing the highest standard of care. With diverse 
          expertise and a shared passion for patient well-being, we work
          together to ensure every visit is a positive experience.
        </p>
      </div>
      <div className="flex w-full gap-6 md: lg:flex overflow-x-auto lg:overflow-x-auto whitespace-nowrap md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 md:overflow-visible items-center justify-around">
        <div className="lg:pt-[125px] md:pt-0 pt-[75px] flex-shrink-0">
          <TeamCard />
        </div>
        <div className="flex-shrink-0">
          <TeamCard />
        </div>
        <div className="lg:pt-[125px] md:pt-0 pt-[75px] flex-shrink-0">
          <TeamCard />
        </div>
        <div className="flex-shrink-0">
          <TeamCard />
        </div>
      </div>
    </div>
  );
};

export default Teams;
