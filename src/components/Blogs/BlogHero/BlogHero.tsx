"use client";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

const BlogHero = () => {
  const [rightDisable, setRightDisable] = useState<boolean>(false);
    const [leftDisable, setLeftDisable] = useState<boolean>(true);
  const heroDescriptions = [
    {
      description:
        "At Dentist Clinic, we provide personalized, high-quality dental care. Our experienced team is dedicated to helping you achieve a healthy, confident mdile in a comfortable environment.",
    },
    {
      description:
        "At Dentist Clinic, we provide personalized, high-quality dental care. Our experienced team is dedicated to helping you achieve a healthy, confident mdile in a comfortable environment.",
    },
    {
      description:
        "At Dentist Clinic, we provide personalized, high-quality dental care. Our experienced team is dedicated to helping you achieve a healthy, confident mdile in a comfortable environment.",
    },
    {
      description:
        "At Dentist Clinic, we provide personalized, high-quality dental care. Our experienced team is dedicated to helping you achieve a healthy, confident mdile in a comfortable environment.",
    },
  ];
  const handleReachBeginning = () => setLeftDisable(true);
  const handleReachEnd = () => setRightDisable(true);
  const handleSlideChange = (swiper:SwiperInstance) => {
    setLeftDisable(swiper.isBeginning);
    setRightDisable(swiper.isEnd);
  };

  return (
    <div className="pt-[63px] w-full overflow-hidden max-w-screen">
      <div className="rounded-3xl relative max-h-[836px] w-full">
        {/* Background Image */}
        <Image
          src={IMAGES.blogHEroImg}
          alt="blog-hero"
          className="w-full h-auto lg:max-h-[836px] md:max-h-[896px] max-h-[729px] lg:min-h-[836px] md:min-h-[896px] min-h-[729px] rounded-3xl object-cover"
        />

        {/* Content Overlay */}
        <div className="bg-gradient-black w-full max-w-[500px] 2xl:max-w-[866px] h-full absolute top-0 bottom-0 rounded-3xl lg:p-16 pb-10 pl-11 2xl:pl-[90px] flex flex-col lg:justify-center justify-end">
          {/* Hero Title */}
          <h1 className="text-secondary-30 font-Amiri  text-4xl md:text-[48px] 2xl:text-[64px] font-bold leading-[42px] md:leading-[66px] 2xl:leading-[90px]">
            Expert Dental <br /> Advice and Tips
          </h1>

          {/* Swiper Slider */}
          <div className="w-[500px]">
          <Swiper
            className="overflow-hidden"
            modules={[Navigation]}
            slidesPerView={1}
            onReachBeginning={handleReachBeginning}
            onReachEnd={handleReachEnd}
            onSlideChange={handleSlideChange}
            navigation={{
              prevEl: "#prevButton",
              nextEl: "#nextButton",
            }}
          >
            {heroDescriptions.map((description, index) => (
              <SwiperSlide key={index}>
                <p className="font-Poppins text-xs md:text-base lg:text-[22px] text-secondary-30 max-w-[300px] lg:max-w-[497px] mt-3">
                  {description.description}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>


          

          {/* Navigation Buttons */}
          <div className="flex items-center gap-8 mt-[60px] relative z-10">
            {/* Previous Button */}
            <button
              id="prevButton"
              className={`bg-primary-10 ${leftDisable? "opacity-40":""}  flex items-center z-100 justify-center rounded-full w-8 md:w-[48px] lg:h-[60px] h-8 md:h-[48px] lg:w-[60px] overflow-hidden`}
            >
              <Image
                src={ICONS.previousDisabled }
                alt="previous-arrow"
                className="md:w-8 md:h-8 w-4 h-4 "
              />
            </button>
            {/* Next Button */}
            <button
              id="nextButton"
              className={`bg-primary-10 ${rightDisable? "opacity-40":""} flex items-center justify-center rounded-full w-8 md:w-[48px] lg:h-[60px] h-8 md:h-[48px] lg:w-[60px] overflow-hidden`}
            >
              <Image
                src={ICONS.nextActive}
                alt="next-arrow"
                className="md:w-8 md:h-8 w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
