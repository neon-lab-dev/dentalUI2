"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://dental-backend-three.vercel.app/api/v1/login",
        { email: userName, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data.success) {
        const {id ,first_name, email, phoneNo } = response.data.user; 
        console.log(response.data.user)
        dispatch(setUser({ id, first_name, email, phoneNo, isLoggedIn: true }));
        router.push("/");
      } else {
        setErrorMessage(`Login failed: ${response.data.message}`);
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        setErrorMessage("Network error, please try again.");
      } else {
        setErrorMessage(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="w-full flex justify-start items-center gap-20">
      <div className="flex flex-col md:gap-12 gap-8">
        <div className="py-6">
          <h1 className="font-Amiri md:text-5xl text-4xl font-bold leading-[66px] pb-8 text-neutral-15">
            Welcome Back!
          </h1>
          <p className="font-Poppins lg:text-xl md:text-base text-xs text-neutral-10">
            Access your account to manage appointments, review treatment plans, and stay connected with your dental care. Enter your details below to get started.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-[840px] space-y-4">
          <div className="py-6">
            <InputField
              id="username"
              name="username"
              label="Email Id"
              type="email"
              placeholder="Enter Email ID"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full pb-8"
            />
            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <p className="lg:text-xl md:text-base text-xs py-1 text-center md:text-start text-red-700">{errorMessage}</p>

          <Button variant="Filled" classNames="w-full flex justify-center">
            Submit
          </Button>
        </form>
        <p className="lg:text-xl md:text-base text-xs pt-6 text-center md:text-start">
          Don't have an account?{" "}
          <span className="text-[#FF7F50] cursor-pointer">Sign Up</span>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
