import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Container from "@/components/shared/Container/Container";
import Heading from "@/components/shared/Heading/Heading";
import Image from "next/image";
// import Marquee from "react-fast-marquee";

const OurPartners = () => {
  const ourPartners = [IMAGES.logo1, IMAGES.logo2, IMAGES.logo3 ];
  return (
    <div className="py-[110px]">
      <div className="bg-secondary-10 py-[156px]">
        <Container>
          <div className="flex flex-col gap-[65px]">
            <Heading
              subHeading={"OUR PARTNERS"}
              classNames={""}
              aligned={"Center"}
              headingWidth={"max-w-[870px]"}
              isHeadingCenter={true}
            >
              We Partner with{" "}
              <span className="text-primary-10">Leading Insurance</span>{" "}
              Providers
            </Heading>

            {/* Divider */}
            <hr className="border border-black w-full" />

            <div className="relative overflow-hidden w-full">
              <div className="flex animate-marquee gap-[100px]">
                {ourPartners.map((partner, index) => {
                  // Define different size classes for each index or condition
                  const sizes = [
                    { width: "lg:w-[354px] md:w-[192px] w-[118px]", height: "h-auto" }, // First image size
                    { width: "lg:w-[451px] md:w-[247px] w-[150px] ", height: "h-auto" }, // Second image size
                    { width: "lg:w-[412px] md:w-[228px] w-[137px]", height: "h-auto" }, // Third image size
                    { width: "w-[14vw]", height: "h-auto" }, // Fourth image size
                  ];

                  // Get the size for the current image based on its index
                  const { width, height } = sizes[index % sizes.length];

                  return (
                    <Image
                      key={index}
                      src={partner}
                      alt={`logo-${index + 1}`}
                      width={150}
                      height={80}
                      className={`${width} ${height}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <hr className="border border-black w-full" />
            <Button
              variant="Filled"
              classNames=" flex justify-center text-xs sm:text-base md:text[20px] px-[50px] py-4 md:w-fit item-center w-full mx-auto"
            >
              Learn More
              <Image
                src={ICONS.arrowUpWhite}
                alt="arrow-up"
                className="md:size-[22px] sm:size-4 size-3"
              />
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OurPartners;
