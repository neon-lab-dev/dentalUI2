import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col gap-[60px] pt-[120px]">
      <div>
        <h1 className="text-neutral-15 font-Amiri lg:text-[64px] sm:text-[48px] text-[36px] font-bold lg:leading-[90px] sm:leading-[48px] leading-[42px] text-center max-w-[1121px] mx-auto w-full">
          Creating Beautiful,{" "}
          <span className="text-primary-10 ">Healthy Smiles</span> with Expert
          Dental Care
        </h1>
        <p className="text-neutral-10 font-Poppins lg:text-[22px] sm:text-base text-sm text-center max-w-[724px] mx-auto w-full mt-8">
          Your trusted family dentist for cleanings, cosmetic treatments, and
          more. Book your appointment today!
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-6">
      <Link href={"/locations/schedule-appointment"}>
        <Button variant="Gradient" classNames="lg:px-[50px] lg:py-[22px] lg:px-[36px] md:py-[16px] px-[28px] py-[14px] ">
         Schedule An Appointment!
        </Button>
        </Link>
        <button className="lg:p-6 sm:p-4 p-3 rounded-full bg-secondary-10">
          <Image src={ICONS.phone} alt="phone-icon" className="size-7" />
        </button>
      </div>

      <Image
        src={IMAGES.heroImg}
        alt="hero-image"
        className="w-full  h-[280px] md:h-[400px] lg:h-[600px] rounded-3xl  object-cover "
      />
    </div>
  );
};

export default Hero;
