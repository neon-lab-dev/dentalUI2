"use client";
import { useState } from "react";
import axios from "axios";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";
import Link from "next/link";

const SignUpPage = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [induranceStatus, setInduranceStatus] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_BASE_URL}/register`,
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
        alert("Registration successful");
      } else {
        setErrorMessage(`Registration failed: ${response.data.message}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          `Registration failed: ${error.response?.data?.message || "Unknown error occurred."}`
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fname || !lname || !email || !phone || !dob || !password || !cnfpassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== cnfpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage(""); // Clear errors
    handleRegister();
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full">
        <h1 className="font-Amiri md:text-5xl text-4xl font-bold leading-[66px] pb-4 text-neutral-15">
          Join Our Dental Family
        </h1>
        <p className="font-Poppins lg:text-xl md:text-base text-xs pt-4 text-neutral-10">
          Sign up today and take the first step toward a healthier smile.
        </p>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="max-w-[840px]">
          <div className="py-6 flex flex-col lg:gap-8 gap-4">
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="firstname"
                name="fname"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
                minLength={2}
                className="w-full"
              />
              <InputField
                id="lastname"
                name="lname"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
                minLength={2}
                className="w-full"
              />
            </div>
            <div className="lg:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="emailId"
                name="email"
                label="Email ID"
                type="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="^\S+@\S+\.\S+$"
                errorMessage="Invalid email format."
                className="w-full"
              />
              <InputField
                id="phonenumber"
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="^\d{10}$"
                errorMessage="Phone number must be 10 digits."
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
                required
                className="w-full "
              />
              <InputField
                id="example-select"
                name="insurance"
                label="Select Insurance"
                type="select"
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
                ]}
                required
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
                required
                minLength={6}
                className="w-full"
              />
              <InputField
                id="cnfpassword"
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={cnfpassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>
          {errorMessage && (
            <p className="lg:text-xl md:text-base text-xs py-1 text-center md:text-start text-red-700">
              {errorMessage}
            </p>
          )}
          <Button
            variant="Filled"
            classNames="w-full flex justify-center"
            disable={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="lg:text-xl md:text-base text-xs pt-6 text-center md:text-start">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FF7F50] cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
