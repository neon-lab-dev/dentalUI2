import React, { ReactNode } from "react";
import Image from "next/image";
import Container from "@/components/shared/Container/Container";
import LoginSignupImage from "@/assets/images/LoginSignup.jpeg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row  w-[100%] justify-center items-center gap-20  w-full lg:h-screen mt-10 ">
      <div className="relative w-full lg:w-[45%] h-[40vh] lg:h-full min-h-[276px] md:min-h-[421px] ">
          {/* Image */}
          <Image
            className="object-cover rounded-3xl h-full w-full min-h-[276px] md:min-h-[421px]"
            src={LoginSignupImage}
            alt="Login or Sign Up Page Image"
            layout="fill"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>

          {/* Text on top of the image */}
          <div className="lg:absolute hidden  inset-0  pl-[60px] pb-[60px] flex  items-end text-white">
            <div className="text-center">
              <span className="block text-5xl font-Amiri font-bold">
                Dental
              </span>
              <span className="block text-xl font-Poppins tracking-[15px]">
                Clinic
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] ">{children}</div>
      </div>
    </Container>
  );
};

export default AuthLayout;
