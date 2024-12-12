"use client";
import { useState } from "react";

import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dob: string;
  insurance: string;
  password: string;
  cnfpassword: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    insurance: "",
    password: "",
    cnfpassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    alert("Submitted Sucessfully");
  };

  return (
    <div className=" w-full flex flex-col justify-start items-center ">
      <div className="w-full">
          <h1 className="font-Amiri md:text-5xl text-4xl font-bold leading-[66px] pb-4 text-neutral-15">
            Join Our Dental Family
          </h1>
          <p className="font-Poppins lg:text-xl md:text-base text-xs pt-4 text-neutral-10">
            Sign up today and take the first step toward a healthier smile.
          </p>
        </div>
      <div className="w-full">
        
        <form onSubmit={handleSubmit} className="max-w-[840px]  ">
          <div className="py-6 flex flex-col  lg:gap-8 gap-4">
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="firstname"
                name="fname"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={formData.fname}
                onChange={handleChange}
                className="w-full "
              />
              <InputField
                id="lastname"
                name="lname"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={formData.lname}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="lg:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="emailId"
                name="email"
                label="Email Id"
                type="email"
                placeholder="Enter Email ID"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
              <InputField
                id="phonenumber"
                name="phone"
                label="Phone Number"
                type="number"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.dob}
                onChange={handleChange}
                className="w-full"
              />
              <InputField
                id="example-select"
                name="insurance"
                label="Select an Insureance"
                type="select" // Use 'select' type for dropdown
                value={formData.insurance}
                onChange={handleChange}
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
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full "
              />
              <InputField
                id="cnfpassword"
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                placeholder=" Confirm Password"
                value={formData.cnfpassword}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <Button variant="Filled" classNames="w-full flex justify-center">
            Login
          </Button>
        </form>
        <p className="lg:text-xl md:text-base text-xs pt-6 text-center md:text-start">
          Already have an account?{" "}
          <span className="text-[#FF7F50] cursor-pointer"> Login </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
