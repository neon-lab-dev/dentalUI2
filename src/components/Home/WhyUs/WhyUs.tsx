import { ICONS, IMAGES } from "@/assets";
import Heading from "@/components/shared/Heading/Heading";
import Image from "next/image";
import WhyUsCard from "./WhyUsCard";

const WhyUs = () => {
  const whyUsInfo = [
    {
      icon: ICONS.care,
      title: "Compassionate Care",
      description:
        "Patients feel at ease knowing their comfort and well-being are prioritized.",
    },
    {
      icon: ICONS.expertise,
      title: "Expertise You Can Trust",
      description:
        "Our experienced team provides high-quality, reliable dental treatments.",
    },
  ];
  return (
    <div className="lg:flex flex flex-col lg:flex-row max-w-full items-center justify-between gap-20">
      <div className="lg:order-2 flex flex-col lg:item-start lg:items-start">
        <Heading
          subHeading={"WHY US"}
          classNames={"max-w-[340px] md:max-w-[881px] w-full"}
          aligned={"Left"}
          headingWidth={"200px"}
          isHeadingCenter={false}
        >
          <p className="max-w-[600px]">
            Why <span className="text-primary-10">Choose Us</span> for Your
            Dental Care?
          </p>
        </Heading>
        <p className="text-neutral-10 font-Poppins text-xs lg:text-xl md:text-base max-w-[340px] md:max-w-[881px] w-full">
          See how we’ve transformed mdiles and improved lives through expert
          dental care. Read testimonials from patients who trust us with their
          oral health.
        </p>

        <div className="flex items-center gap-8 mt-8">
          {whyUsInfo.map((info, index) => (
            <WhyUsCard key={index} info={info} />
          ))}
        </div>
      </div>
      <Image
        src={IMAGES.whyUs}
        alt="why-us-img"
        className={`w-full  2xl:max-w-[824px] object-cover lg:order-1 rounded-3xl 2xl:max-h-[831px]`}
      />
      
    </div>
  );
};

export default WhyUs;
