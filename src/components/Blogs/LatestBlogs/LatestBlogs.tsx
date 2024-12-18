"use client";
// import { IMAGES } from "@/assets";
import Button from "@/components/Buttons/Button";
import { useState } from "react";
import LatestBlogCard from "./LatestBlogCard";

const LatestBlogs = ({ blogData }: any) => {
  // const blogData = [
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //     category : "Latest"
  //   },
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //     category : "Latest"
  //   },
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //     category : "Latest"
  //   },
  //   {
  //     img: IMAGES.blog2,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //     category : "Hot"
  //   },
  //   {
  //     img: IMAGES.blog3,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //       category : "Trending"
  //   },
  //   {
  //     img: IMAGES.blog3,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //       category : "Trending"
  //   },
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //       category : "Popular"
  //   },
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //       category : "Popular"
  //   },
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //       category : "Popular"
  //   },
  //   {
  //     img: IMAGES.blog1,
  //     title: "Invisalign vs. Braces: Which is Right for You?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
  //       category : "Popular"
  //   },
  // ];
  console.log(blogData);
  const [activeTab, setActiveTab] = useState("Latest");
  const tabButtons = ["Latest", "Hot", "Trending", "Popular"];
  return (
    <div className="mt-[120px]">
      <h1 className="text-neutral-15 font-Amiri text-4xl sm:text-[48px] 2xl:text-[64px] font-bold leading-[40px] sm:leading-[44px] 2xl:leading-[66px]">
        Discover Our Latest Dental Tips and Insights
      </h1>
      <p className="text-neutral-10 font-Poppins md:text-xl sm:text-base text-xs max-w-[935px] mt-8">
        Check out our most recent blog posts for up-to-date advice on oral
        health, treatment options, and dental care best practices. Stay ahead
        with tips to keep your smile healthy and vibrant.
      </p>

      <div className="sm:flex grid  grid-cols-3 items-center gap-5 mt-8">
        {tabButtons.map((btn, index) => (
          <Button
            onClick={() => setActiveTab(btn)}
            key={index}
            variant={btn === activeTab ? "Filled" : "Outlined"}
            classNames="sm:px-8 flex justify-center px-[20px] py-2 sm:py-[10px] text-xs sm:text-base md:text-[20px] font-normal"
          >
            {btn}
          </Button>
        ))}
      </div>

      <hr className="border border-neutral-15 mt-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {blogData.map(
          // @ts-ignore
          (blog, index) =>
            <div key={index}>
            {/* // blog.category === activeTab && (
            // ) */}
            <LatestBlogCard key={index} blog={blog} />
            </div>
        )}
      </div>
    </div>
  );
};

export default LatestBlogs;
