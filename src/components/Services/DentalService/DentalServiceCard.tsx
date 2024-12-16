import Button from "@/components/Buttons/Button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface DentalServiceCardProps {
  img: string | StaticImageData;
  title: string;
  content: string;
  isFullWidth?: boolean;
  isBtnVisible?: boolean;
}

const DentalServiceCard: React.FC<DentalServiceCardProps> = ({
  img,
  title,
  content,
  isFullWidth=false,
  isBtnVisible = false,
}) => {
  return (
    <div
      className={`${
        isFullWidth
          ? "flex flex-col lg:flex-row  items-start gap-8 w-full"
          : ""
      } border border-neutral-15/60 rounded-3xl`}
    >
      <Image
        src={img}
        alt="Dental service"
        className={`${
          isFullWidth
            ? "h-full w-full lg:w-1/2 object-cover  rounded-t-3xl lg:rounded-l-3xl lg:rounded-r-none"
            : "w-full object-cover rounded-t-3xl h-[270px]"
        }`}
      />
      <div
        className={`${
          isFullWidth
            ? "p-6 flex-1"
            : "flex flex-col p-6 2xl:p-12 "
        }`}
      >
        <h1 className="text-black font-Amiri lg:text-[46px] md:text-[32px] text-2xl font-bold lg:leading-[48px] md:leading-8 leading-7">
          {title}
        </h1>
        <p className="text-neutral-10 font-Poppins lg:text-xl md:text-base text-xs text-start  mt-4">{content}</p>
        <Link href={"/locations/schedule-appointment"}>
        <Button variant="Gradient" classNames={`lg:px-[50px] lg:py-[22px] lg:px-[36px] md:py-[16px] px-[28px] mt-5 py-[14px] ${isBtnVisible?"":"hidden"} `}>
         Schedule An Appointment!
        </Button>
        </Link>


       
      </div>
    </div>
  );
};

export default DentalServiceCard;
