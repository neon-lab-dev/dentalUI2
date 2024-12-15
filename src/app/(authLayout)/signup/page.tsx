"use client";
import { useState } from "react";
import axios from "axios";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";


const SignUpPage = () => {
  
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [induranceStatus, setInduranceStatus] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");


  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://dental-backend-three.vercel.app/api/v1/register",
        {
          first_name: fname,
          last_name: lname,
          phoneNo: phone,
          email,
          password,
          confirm_password: cnfpassword,
          dob,
          induranceStatus,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
  
      if (response.data.success) {
        console.log(response.data.message);
        alert("Registration successful");
        console.log("Registration successful");
        // Redirect logic here
      } else {
        setErrorMessage(`Registration failed: ${response.data.message}`);
      }
    } catch (error: unknown) {
      // Use axios.isAxiosError to check for Axios-specific error
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          `Registration failed: ${error.response?.data?.message || "Unknown error occurred."}`
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== cnfpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    handleRegister();
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
            <div className="lg:flex-row flex flex-col lg:gap-8 gap-4">
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
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full "
              />
              <InputField
                id="cnfpassword"
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                placeholder=" Confirm Password"
                value={cnfpassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
         <p className="lg:text-xl md:text-base text-xs py-1 text-center md:text-start text-red-700">{errorMessage}</p>
          <Button variant="Filled" classNames="w-full flex justify-center">
          Register
          </Button>
        </form>
        <p className="lg:text-xl md:text-base text-xs pt-6 text-center md:text-start  ">
          Already have an account?{" "}
          <span className="text-[#FF7F50] cursor-pointer">  Login </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
