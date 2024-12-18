/* eslint-disable @typescript-eslint/no-explicit-any */
import { URLFor } from "@/app/lib/sanity";
import Button from "@/components/Buttons/Button";
import Image from "next/image";

const LatestBlogCard = ({ blog }: { blog: any }) => {
  console.log(blog,'card')
  return (
    <div className="shadow-md rounded-3xl">
      <Image
        src={URLFor(blog.blogImage).url()}
        alt="Clinic image" width={200} height={200}
        className={`w-full object-cover rounded-t-3xl h-[270px]`}
      />
      <div className="flex flex-col p-6">
        <h1 className="text-black text-[32px] font-bold lg:leading-[40px] sm:leading-[30px] leading-[22px] font-Amiri text-xl sm:text-[28px] lg:text[32px]">
          {blog.title}
        </h1>
        <p className="text-neutral-10 font-Poppins text-xs lg:text-xl sm:text-base mt-[15px]">
          {blog.smallDescription}
        </p>
        <Button
          variant="Outlined"
          classNames="px-2 sm:py-4  mt-[30px] text-center flex justify-center w-full md:w-[260px] 2xl:mt-[56px] text-xs sm:text-base md:text[20px]  "
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default LatestBlogCard;
