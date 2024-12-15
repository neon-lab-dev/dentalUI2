"use client";
import React, { useState } from "react";
import Container from "@/components/shared/Container/Container";
import InputField from "@/components/Form/InputField";
import AppointmentCard from "@/components/Profile/AppointmentCard";

const MyAppointments = () => {
  return <div className="mt-16">
    <AppointmentCard/>
  </div>;
};

const MyProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [induranceStatus, setInduranceStatus] = useState("");
  return <div>
    <form className="w-full mt-20 ">
          <div className="py-6 flex flex-col  lg:gap-8 gap-4">
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="firstname"
                name="fname"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-full "
              />
              <InputField
                id="lastname"
                name="lname"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="xl:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="emailId"
                name="email"
                label="Email Id"
                type="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <InputField
                id="phonenumber"
                name="phone"
                label="Phone Number"
                type="number"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="DOB"
                name="dob"
                label="Date Of Birth"
                type="date"
                placeholder="Enter Date Of Birth"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="w-full"
              />
              <InputField
                id="example-select"
                name="insurance"
                label="Select an Insureance"
                type="select" // Use 'select' type for dropdown
                value={induranceStatus}
                onChange={(e) => setInduranceStatus(e.target.value)}
                options={[
                  "-Select One-",
                  "ICICI Lombard",
                  "Bajaj Fincerv",
                  "Kotak Mahindra",
                  "TATA AIA",
                  "Bharti AXA",
                  "LIC",
                ]} // Array of options
                className="w-full"
              />
            </div>
          </div>
          <button className=" mt-8 bg-gradient-to-r from-[#304557] to-[#098FC9] text-[#F5F5DC] w-fit  border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[18px] py-[8px] lg:text-[22px] md:text-[18px] text-sm font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap ">
              Edit
            </button>
        </form>
  </div>;
};

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("MyAppointments");

  return (
    <Container>
      <div className="flex w-full justify-center items-center bg-transparent">
        <div className="w-full bg-transparent flex xl:flex-row flex-col gap-6 md:gap-8 justify-between">
          {/* Sidebar or Navigation */}
          <div className="flex-[3]  xl:flex-[3] flex-1 flex flex-col justify-between mt-16">
            <h1 className="hidden xl:flex text-black font-amiri text-[64px] font-bold leading-[90px]">
              My Account
            </h1>
            <div>
              <p className="hidden xl:flex text-[20px] font-poppins font-normal text-[#333] leading-normal [text-edge:cap] [leading-trim:both]">
                My Account /
                <span className="text-[20px] font-poppins font-normal text-[#FF7F50] leading-normal [text-edge:cap] [leading-trim:both]">
                  {selectedOption}
                </span>
              </p>
            </div>

            <nav className="xl:mt-24 mt-10 rounded-[32px] bg-[#F5F5DC] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
              <button
                onClick={() => setSelectedOption("MyAppointments")}
                className={`flex w-full xl:py-[20px] py-4 px-2 justify-start ${
                  selectedOption === "MyAppointments"
                    ? "text-black w-full bg-secondary-10 font-bold rounded-t-[32px]"
                    : "text-neutral-500"
                }`}
              >
                My Appointments
              </button>
              <div className="border"></div>
              <button
                onClick={() => setSelectedOption("Profile")}
                className={`flex w-full xl:py-[20px] py-4 px-2 justify-start ${
                  selectedOption === "Profile"
                    ? "text-black w-full bg-secondary-10 font-bold rounded-b-[32px]"
                    : "text-neutral-500"
                }`}
              >
                Profile
              </button>
            </nav>
            <button className=" xl:mt-36 mt-8 bg-primary-20 text-[#F5F5DC] w-full  border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[18px] py-[8px] lg:text-[22px] md:text-[18px] text-sm font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap ">
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-[7] xl:flex-[7] flex-1">
            {selectedOption === "MyAppointments" && <MyAppointments />}
            {selectedOption === "Profile" && <MyProfile />}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
