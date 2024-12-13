"use client";
import { IMAGES } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";

const ImageGallary = () => {
  const [isOpen, setIsOpen] = useState<number>(0);
  const toggle = ({ currentIdx }: { currentIdx: number }) =>
    setIsOpen((prevIdx) => (prevIdx === currentIdx ? 0: currentIdx));
  const sliders = [
    { img: IMAGES.location1, title: "New York City" },
    { img: IMAGES.location2, title: "Los Angeles" },
    { img: IMAGES.location3, title: "Chicago" },
    { img: IMAGES.location4, title: "Houston" },
  ];

  return (
    <div className="flex justify-center gap-1 lg:gap-4">
      {sliders.map((slide, idx) => (
        <div
          onClick={() => toggle({ currentIdx: idx })}
          className={`cursor-pointer relative rounded-3xl bg-gray-300 duration-500 ease-in-out h-[670px] ${
             isOpen === idx
              ? "w-[300px] 2xl:w-[402px]" // Expanded width for clicked image
              : "w-[100px] 2xl:w-[118px]" // Default width for unclicked images
          }`}
          key={idx}
        >
          {/* Image */}
          <Image
            width={640}
            height={540}
            className="h-full rounded-3xl object-fill"
            src={slide.img}
            alt="accordion navigate ui"
          />

          {/* Overlay for closed cards */}
          {isOpen !== idx && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>
          )}

          {/* Vertical Text for Closed State */}
          {isOpen !== idx && (
            <div className="absolute inset-0 flex items-end justify-center">
              <h3
                className="text-white text-[48px] font-bold leading-[66px] font-Amiri mb-8"
                style={{
                  writingMode: "vertical-rl", // Vertical text
                  textOrientation: "mixed", // Proper upright orientation
                  transform: "rotate(180deg)", // Flip to align correctly on the right side
                  textAlign: "right", // Align text properly
                  transformOrigin: "center",
                  // translate: '0 -50%'
                }}
              >
                {slide.title}
              </h3>
            </div>
          )}

          {/* Horizontal Text for Open State */}
          {isOpen === idx && (
            <div className="absolute bottom-5 left-[50%] translate-x-[-50%] text-white">
              <h3 className="text-white text-[30px] 2xl:text-[48px] font-bold leading-normal 2xl:leading-[66px] font-Amiri">
                {slide.title}
              </h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallary;
