import React from "react";

const ClinicInfo = () => {
  return (
    <div className=" text-gray-800 px-4 lg:px-16 py-12  border-gray-300 px-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="font-Amiri font-bold lg:text-[48px] lg:leading-[66px] md:text-[32px] md:leading-[48px] text-[20px] leading-[30px] ">Our Queens dental clinic combines modern technology with</p>
        <p className="font-Amiri font-bold lg:text-[48px] lg:leading-[66px] md:text-[32px] md:leading-[48px] text-[20px] leading-[30px] ">a welcoming atmosphere to give you the best care possible.</p>
        <p className="font-Amiri font-bold lg:text-[48px] lg:leading-[66px] md:text-[32px] md:leading-[48px] text-[20px] leading-[30px] ">
          Located conveniently in the heart of Queens, our skilled team is here to provide personalized
        </p>
        <p className="font-Amiri font-bold lg:text-[48px] lg:leading-[66px] md:text-[32px] md:leading-[48px] text-[20px] leading-[30px] ">treatments for you and your family.</p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16">
        {/* Hours */}
        <div className="flex flex-col w-full pr-10 items-start border-b-2 border-b-primary-10  md:border-b-0 md:border-r-2 md:border-r-primary-10">
          <h3 className="text-lg font-bold w-full mb-4">Hours</h3>
          <ul className="space-y-4 w-full ">
            <li className="flex  justify-between gap-4 w-full">
              <span>Monday</span>
              <span>2PM–8PM</span>
            </li>
            <li className="flex justify-between gap-4 w-full">
              <span>Tuesday</span>
              <span>8AM–2PM</span>
            </li>
            <li className="flex justify-between gap-4 w-full">
              <span>Wednesday</span>
              <span>2PM–8PM</span>
            </li>
            <li className="flex justify-between gap-4 w-full">
              <span>Thursday</span>
              <span>8AM–2PM</span>
            </li>
            <li className="flex justify-between gap-4 w-full">
              <span>Friday</span>
              <span>8AM–3PM</span>
            </li>
          </ul>
        </div>

        {/* Clinic Information */}
        <div className="flex flex-col items-start md:ml-20">
          <h3 className="text-lg font-bold mb-4">Clinic Information</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <span></span>
              <span>45-12 21st Street, Long Island City, NY 11101</span>
            </li>
            <li className="flex items-center gap-2">
              <span></span>
              <span>555-123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span>555-123-4567</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm mt-12 text-gray-500">
<p>
          We&apos;re located near [landmark or transportation hub], making it easy to visit us.
        </p>
      </div>
    </div>
  );
};

export default ClinicInfo;
