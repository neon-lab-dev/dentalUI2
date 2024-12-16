import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import React from "react";
import Container from "../Container/Container";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    {
      heading: "Menu",
      links: [
        {
          label: "Home",
          path: "/",
        },
        {
          label: "Services",
          path: "/services",
        },
        {
          label: "Locations",
          path: "/locations",
        },
        {
          label: "Blogs",
          path: "/blogs",
        },
      ],
    },
  ];

  const services = [
    {
      heading: "Services",
      links: [
        {
          label: "First Visit",
        },
        {
          label: "Emergency Exam",
        },
        {
          label: "Teeth Whitening",
        },
        {
          label: "Invisalign",
        },
        {
          label: "Implants",
        },
      ],
    },
  ];

  const contactInfo = [
    {
      heading: "Contact",
      links: [
        {
          icon: ICONS.phone,
          label: "+1 323-234-5812",
          path: "tel:+1 323-234-5812",
        },
        {
          icon: ICONS.email,
          label: "example@gmail.com",
          path: "mailto:example@gmail.com",
        },
        {
          icon: ICONS.location,
          label: "Lorem ipsum dolor sit amet, consectetur",
        },
      ],
    },
  ];

  return (
    <Container>
      <div className="font-Amiri bg-secondary-10 rounded-3xl p-9 2xl:p-12 w-full mt-[160px] mb-[120px]">
        <div className="md:grid md:grid-cols-3 w-full flex flex-col gap-8">
          <div className="flex flex-col justify-center items-center md:items-start flex-1 gap-8 ">
            <Image
              src={IMAGES.dentistClinicLogo}
              alt="dentist-clinic"
              className="md:w-[151px] sm:w-[130px] w-[110px]"
            />

            <h1 className="text-neutral-15 font-Amiri text-center md:text-start  text-base sm:text-[24px] md:text-[32px] font-bold leading-normal 2xl:leading-[66px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>

            <p className="text-neutral-10 font-Poppins text-xs sm:text-base text-center md:text-start md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae
              nunc sollicitudin nunc tempus efficitur. In hac habitasse platea
              dictumst.
            </p>
          </div>

          <div className="flex justify-between flex-1 w-full">
            <div className="flex items-start justify-center ">
              {footerLinks.map((item, index) => (
                <div key={index} className="flex flex-col justify-center gap-4 md:gap-8">
                  <h1 className="text-neutral-15 font-Amiri md:text-[32px] text-2xl font-bold md:leading-[48px] leading-[38px]  ">
                    {item.heading}
                  </h1>

                  <div className="flex flex-col  gap-3 sm:gap-4 md:gap-6">
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.path}
                        className="text-neutral-10 font-Poppins md:text-xl sm:text-base text-sm hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start justify-center">
              {services.map((item, index) => (
                <div key={index} className="flex flex-col gap-4 md:gap-8">
                  <h1 className="text-neutral-15 font-Amiri md:text-[32px] text-2xl font-bold md:leading-[48px] leading-[38px]">
                    {item.heading}
                  </h1>

                  <div className="flex flex-col  gap-3 sm:gap-4 md:gap-6">
                    {item.links.map((link) => (
                      <p
                        key={link.label}
                        className="text-neutral-10 font-Poppins md:text-xl sm:text-base text-sm "
                      >
                        {link.label}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:flex items-start justify-center flex-1  w-full">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex flex-col items-center md:items-start gap-4 md:gap-8">
                <h1 className="text-neutral-15 font-Amiri md:text-[32px] text-2xl font-bold md:leading-[48px] leading-[38px]">
                  {info.heading}
                </h1>

                <div className="flex flex-col w-full gap-6">
                  {info.links.map((link) => (
                    <div key={link.label} className="flex items-center justify-center md:justify-start gap-4 ">
                      <Image
                        src={link.icon}
                        alt="dentist-clinic"
                        className="size-6"
                      />
                      {link.path ? (
                        <a
                          href={link.path}
                          className="text-neutral-10 font-Poppins text-sm sm:text-base md:text-xl max-w-[230px] hover:underline"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <p
                          key={link.label}
                          className="text-neutral-10 font-Poppins text-sm sm:text-base md:text-xl text-xl max-w-[230px]"
                        >
                          {link.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
      </div>
    </Container>
  );
};

export default Footer;
