"use client";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Container from "../Container/Container";
import { navlinks } from "./navlinks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { first_name, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <Container>
      <div className="flex items-center justify-between pt-[46px]">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={IMAGES.dentistClinicLogo}
            alt="dentist-clinic"
            className="lg:w-[151px] md:w-[130px] w-[70px]"
          />
        </Link>

        {/* Navigation Links */}
        <div
          className={`flex-col lg:flex-row items-center gap-6 z-50 ${
            isMenuOpen ? "flex" : "hidden lg:flex"
          } absolute lg:relative top-[100px] lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent p-5 lg:p-0 shadow-md lg:shadow-none`}
        >
          {navlinks.map((link) => (
            <Link
              onClick={() => setIsMenuOpen(false)}
              key={link.label}
              href={link.path}
              className={`text-neutral-10 font-Poppins text-xl ${
                pathname === link.path
                  ? "bg-secondary-10 px-5 py-2 rounded-[32px]"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      <div className="flex items-center">
        {/* Call-to-Action Buttons */}
        <div className="flex items-center gap-2 md:gap-6">
        {isLoggedIn ? (""
        ):(<Link href={"/locations/schedule-appointment"}>
        
          <button  className="border-[#FF7F50] bg-none text-[#FF7F50] border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[18px] py-[8px] lg:text-[22px] md:text-[18px] text-base font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap ">
            Book Now!
          </button>
        </Link>)}
        
          <Link href={isLoggedIn ? "/profile" : "/login"}>
            {isLoggedIn ? (
              <button
                className="lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[18px] py-[8px] lg:text-[22px] md:text-[18px] font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap text-neutral-10 font-Poppins text-base bg-secondary-10"
              >
                <span>Hi, {first_name}!</span>
              </button>
            ) : (
              <button  className=" border-[#FF7F50] bg-[#FF7F50] text-[#F5F5DC]   border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[18px] py-[8px] lg:text-[22px] md:text-[18px] text-sm font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap ">
                Login
              </button>
            )}
          </Link>
        </div>
        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <Image src={ICONS.hamburger} alt="" className="md:size-14 size-7" />
          </button>
        </div>
      </div>
        

        
      </div>
    </Container>
  );
};

export default Navbar;
