/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

type TServiceCard = {
  service: {
    title: string;
    description: string;
    img: any;
  };
};

const ServiceCard: React.FC<TServiceCard> = ({ service }) => {
  return (
    <div
      key={service.title}
      className="rounded-3xl border border-secondary-20 shadow-md h-fit  md:h-[387px]"
    >
      <Image
        src={service.img}
        alt="patient-img"
        className="rounded-t-3xl min-h-[170px] max-h-[214px] object-cover "
      />
      <div className="px-6 pb-6 pt-[10px] lg:pt-4">
        <h1 className="text-neutral-15 text-[32px] font-bold lg:leading-[40px] sm:leading-[30px] leading-[22px] font-Amiri text-xl sm:text-[28px] lg:text[32px]">
          {service.title}
        </h1>
        <p className="text-neutral-10 font-Poppins text-xs lg:text-xl sm:text-base mt-1 2xl:mt-4  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae
          nunc sollicitudin
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
