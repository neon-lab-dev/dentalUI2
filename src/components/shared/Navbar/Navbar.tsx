"use client";
import { IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Container from "../Container/Container";
import { navlinks } from "./navlinks";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { clearUser } from "@/store/slices/userSlice";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { first_name, isLoggedIn } = useSelector((state: RootState) => state.user);


  return (
    <Container>
      <div className="flex items-center justify-between pt-[46px]">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={IMAGES.dentistClinicLogo}
            alt="dentist-clinic"
            className="w-[151px]"
          />
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-neutral-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12" // Close icon
                    : "M4 6h16M4 12h16M4 18h16" // Menu icon
                }
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-col lg:flex-row items-center gap-6 z-50 ${
            isMenuOpen ? "flex" : "hidden lg:flex"
          } absolute lg:relative top-[100px] lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent p-5 lg:p-0 shadow-md lg:shadow-none`}
        >
          {navlinks.map((link) => (
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Call-to-Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href={"/signup"}>
            <Button variant="Outlined" classNames="">
              Book Now!
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button variant="Filled" classNames="">
            {isLoggedIn ? (
        <span>
          Welcome, {first_name}! 
        </span>
      ) : (
       <span>Login</span> 
      )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Buttons */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <Link href={"/signup"}>
            <Button variant="Outlined" classNames="w-full mb-2">
              Book Now!
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button variant="Filled" classNames="w-full">
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
