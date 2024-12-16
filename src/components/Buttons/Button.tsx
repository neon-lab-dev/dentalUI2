import React, { MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TButton = {
  disable?:boolean
  variant: "Outlined" | "Filled" | "Gradient" | "Filled2";
  classNames?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<TButton> = ({
  disable=false,
  variant,
  children,
  classNames,
  onClick,
}) => {
  const baseClasses =
    "border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[28px] py-[14px] lg:text-[22px] md:text-[18px] text-base font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap ";

  const variantClasses = {
    Outlined: "border-primary-10 bg-none text-primary-10",
    Filled: "border-primary-10 bg-primary-10 text-secondary-30",
    Gradient: "border-none bg-primary-gradient text-secondary-30",
    Filled2: "border-none bg-secondary-30 text-primary-10",
  };
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
    disabled={disable}
      onClick={onClick}
      className={twMerge(baseClasses, variantClasses[variant],
        disable && disabledClasses, classNames)}
    >
      {children}
    </button>
  );
};

export default Button;
