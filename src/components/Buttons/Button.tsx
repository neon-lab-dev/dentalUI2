import React, { MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TButton = {
  variant: "Outlined" | "Filled" | "Gradient";
  classNames?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<TButton> = ({
  variant,
  children,
  classNames,
  onClick,
}) => {
  const baseClasses =
    "border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[28px] py-[14px] lg:text-[22px] md:text-[18px] text-base font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap";

  const variantClasses = {
    Outlined: "border-[#FF7F50] bg-none text-[#FF7F50]",
    Filled: "border-[#FF7F50] bg-[#FF7F50] text-[#F5F5DC]",
    Gradient: "border-none bg-primary-gradient text-[#F5F5DC]",
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(baseClasses, variantClasses[variant], classNames)}
    >
      {children}
    </button>
  );
};

export default Button;
