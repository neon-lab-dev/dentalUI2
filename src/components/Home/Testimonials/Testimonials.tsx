"use client";
import { ICONS, IMAGES } from "@/assets";
import Heading from "@/components/shared/Heading/Heading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TestimonialCard from "./TestimonialCard";
import { useState } from "react";

const Testimonials = () => {
  const [rightDisable, setRightDisable] = useState<boolean>(false);
  const [leftDisable, setLeftDisable] = useState<boolean>(true);

  // Dummy Testimonial Data
  const testimonials = [
    {
      img: IMAGES.profileImg,
      name: "John Doe",
      rating: 5,
      review:
        "The care I received was exceptional! The team was professional, and I couldn't be happier with my smile.",
    },
    {
      img: IMAGES.profileImg,
      name: "Jane Smith",
      rating: 4,
      review:
        "Great service and friendly staff. They made me feel comfortable throughout my visit.",
    },
    {
      img: IMAGES.profileImg,
      name: "Michael Brown",
      rating: 5,
      review:
        "Highly recommend! They explained everything clearly and provided top-notch care.",
    },
    {
      img: IMAGES.profileImg,
      name: "Emily Johnson",
      rating: 4,
      review:
        "Wonderful experience from start to finish. The results speak for themselves!",
    },
    {
      img: IMAGES.profileImg,
      name: "Emily Johnson",
      rating: 4,
      review:
        "Wonderful experience from start to finish. The results speak for themselves!",
    },
    {
      img: IMAGES.profileImg,
      name: "Emily Johnson",
      rating: 4,
      review:
        "Wonderful experience from start to finish. The results speak for themselves!",
    },
    {
      img: IMAGES.profileImg,
      name: "Emily Johnson",
      rating: 4,
      review:
        "Wonderful experience from start to finish. The results speak for themselves!",
    },
    {
      img: IMAGES.profileImg,
      name: "Emily Johnson",
      rating: 4,
      review:
        "Wonderful experience from start to finish. The results speak for themselves!",
    },
    {
      img: IMAGES.profileImg,
      name: "Emily Johnson",
      rating: 4,
      review:
        "Wonderful experience from start to finish. The results speak for themselves!",
    },
  ];

  const handleReachBeginning = () => setLeftDisable(true);
  const handleReachEnd = () => setRightDisable(true);
  const handleSlideChange = (swiper:SwiperInstance) => {
    setLeftDisable(swiper.isBeginning);
    setRightDisable(swiper.isEnd);
  };

  return (
    <div>
      {/* Heading Section */}
      <div className="flex items-center justify-between gap-2">
        <div className="md:w-4/6">
          <Heading
            subHeading={"TESTIMONIALS"}
            classNames={""}
            aligned={"Left"}
            headingWidth={""}
            isHeadingCenter={false}
          >
            Real Stories from Our{" "}
            <span className="text-primary-10">Satisfied Patients</span>
          </Heading>
          <p className="text-neutral-10 font-Poppins text-xs lg:text-xl sm:text-base mt-8">
            See how we’ve transformed smiles and improved lives through expert
            dental care. Read testimonials from patients who trust us with their
            oral health.
          </p>
        </div>

        {/* Swiper Navigation Buttons */}
        <div className="hidden md:flex gap-10 justify-end">
          <Image
            id="prevButton"
            src={leftDisable ? ICONS.leftDisabledArrow : ICONS.leftEnabledArrow}
            alt="left-arrow"
            className={`sm:size-[60px] size-12 cursor-pointer ${
              leftDisable && "opacity-50 cursor-not-allowed"
            }`}
          />
          <Image
            id="nextButton"
            src={rightDisable ? ICONS.rightDisabledArrow : ICONS.rightActiveArrow}
            alt="right-arrow"
            className={`sm:size-[60px] size-12 cursor-pointer ${
              rightDisable && "opacity-50 cursor-not-allowed"
            }`}
          />
        </div>
      </div>

      <div className="flex md:hidden items-center gap-10 mt-8">
        <Image
          id="prevButton"
          src={leftDisable ? ICONS.leftDisabledArrow : ICONS.leftEnabledArrow}
          alt="left-arrow"
          className={`sm:size-[60px] size-12 cursor-pointer ${
            leftDisable && "opacity-50 cursor-not-allowed"
          }`}
        />
        <Image
          id="nextButton"
          src={rightDisable ? ICONS.rightDisabledArrow : ICONS.rightActiveArrow}
          alt="right-arrow"
          className={`sm:size-[60px] size-12 cursor-pointer ${
            rightDisable && "opacity-50 cursor-not-allowed"
          }`}
        />
      </div>

      {/* Testimonial Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        onReachBeginning={handleReachBeginning}
        onReachEnd={handleReachEnd}
        onSlideChange={handleSlideChange}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3.4,
          },
          1440:{
            slidesPerView: 3.4,
          }
        }}
        navigation={{
          prevEl: "#prevButton",
          nextEl: "#nextButton",
        }}
        className="mt-20"
      >
        {testimonials.map((review, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
