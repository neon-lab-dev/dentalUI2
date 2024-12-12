import Heading from "@/components/shared/Heading/Heading";
import React from "react";
import BlogCard from "./BlogCard";
import { IMAGES } from "@/assets";

const Blogs = () => {
  const blogData = [
    {
      img: IMAGES.blog1,
      createdAt: "20 oct, 2024",
      author: "By Vincent Chase",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
    },
    {
      img: IMAGES.blog2,
      createdAt: "20 oct, 2024",
      author: "By Vincent Chase",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
    },
    {
      img: IMAGES.blog3,
      createdAt: "20 oct, 2024",
      author: "By Vincent Chase",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
    },
    {
      img: IMAGES.blog1,
      createdAt: "20 oct, 2024",
      author: "By Vincent Chase",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis feugiat ",
    },
  ];
  return (
    <div>
      <Heading
        subHeading={"BLOGS"}
        classNames={""}
        aligned={"Center"}
        headingWidth={""}
        isHeadingCenter={true}
      >
        Stay Informed with Expert{" "}
        <span className="text-primary-10">Dental Tips</span>
      </Heading>
      <p className="text-neutral-10 font-Poppins lg:text-xl md:text-base text-xs max-w-[987px] mx-auto w-full flex-1 mt-8 text-start lg:text-center">
        Explore our blog for the latest insights on dental health, treatments,
        and tips to keep your mdile healthy. Stay updated with expert advice
        from our team.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[64px]">
        {blogData.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
