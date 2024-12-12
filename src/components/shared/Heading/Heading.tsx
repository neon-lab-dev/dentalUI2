import { ReactNode } from "react";

type THeading = {
  subHeading?: string;
  children: ReactNode;
  classNames?: string;
  aligned: string;
  headingWidth?: string | number;
  isHeadingCenter: boolean;
};

const Heading: React.FC<THeading> = ({
  subHeading,
  children,
  classNames, 
  aligned,
  headingWidth,
  isHeadingCenter,
}) => {
  return (
    <div
      className={`flex flex-col ${
        isHeadingCenter ? " items-center" : "items-start"
      }  gap-8 ${classNames}`}
    >
      {subHeading && (
        <div className="lg:px-5 lg:py-[10px] md:px-4 md:py-2 px-[12px] py-[6px] text-xs md:text-sm lg:text-xl text-neutral-10 flex items-center justify-center rounded-[49px] border border-neutral-10 w-fit">
          {subHeading}
        </div>
      )}

      <h1
        className={`text-neutral-15 font-Amiri font-bold lg:text-5xl md:text-4xl text-[32px] lg:leading-[66px] md:leading-[44px] leading-[32px] ${headingWidth} ${
          aligned === "Center" ? "mx-auto" : "mx-0"
        } w-full ${aligned === "Center" ? " text-center" : "text-start"}`}
      >
        {children}
      </h1>
    </div>
  );
};

export default Heading;