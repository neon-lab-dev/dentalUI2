"use client"
import Button from "@/components/Buttons/Button";
import Heading from "@/components/shared/Heading/Heading";
import ImageGallary from "./ImageGallary";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const LocationsHero = () => {
  const {  isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <div className="flex items-center lg:flex-row flex-col gap-10 mt-[120px] overflow-hidden">
      <div className="lg:w-[50%] w-[100%]">
        <Heading
          aligned={"Left"}
          isHeadingCenter={false}
          headingWidth={`max-w-[600px] 2xl:max-w-[744px]`}
        >
          Our Mission: Exceptional{" "}
          <span className="text-primary-10">Dental Care</span> You Can Trust
        </Heading>
        <p className="text-neutral-10 font-Poppins text-xs lg:text-xl md:text-base max-w-[744px] w-full flex-1 mt-8">
          At Dentist Clinic, we provide personalized, high-quality dental care.
          Our experienced team is dedicated to helping you achieve a healthy,
          confident mdile in a comfortable environment.
        </p>
        <div className="flex items-center justify-start mt-8 gap-6">
        <Link href={isLoggedIn?"/locations/schedule-appointment":"/login"}>
        <Button variant="Gradient" classNames="lg:px-[50px] lg:py-[22px] lg:px-[36px] md:py-[16px] px-[28px] py-[14px] ">
         Schedule An Appointment!
        </Button>
        </Link>
      </div>
      </div>
      <div className="lg:w-[50%] w-[100%]">
        <ImageGallary />
      </div>
    </div>
  );
};

export default LocationsHero;