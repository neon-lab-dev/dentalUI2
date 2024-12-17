"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const router = useRouter();

  // Validation logic
  const validateForm = () => {
    if (!userName) {
      setErrorMessage("Email ID is required.");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userName)) {
      setErrorMessage("Please enter a valid email ID.");
      return false;
    }
    if (!password) {
      setErrorMessage("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // API call for login
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Step 1: Login API
      const loginResponse = await axios.post(
        "https://dental-backend-three.vercel.app/api/v1/login",
        { email: userName, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      console.log(loginResponse);
      
  
      if (loginResponse.data.success) {
        // Step 2: Fetch Profile API
        const profileResponse = await axios.get(
          "https://dental-backend-three.vercel.app/api/v1/me",
          { withCredentials: true } // Ensure credentials are sent
        );
  
        if (profileResponse.data.success) {
          const profileData = profileResponse.data.user;
  
          // Step 3: Dispatch profile data to Redux
          dispatch(
            setUser({
              id: profileData.id,
              first_name: profileData.first_name,
              last_name: profileData.last_name,
              email: profileData.email,
              induranceStatus: profileData.induranceStatus || "",
              phoneNo: profileData.phoneNo,
              dob: profileData.dob || "",
              isLoggedIn: true,
            })
          );
  
          // Step 4: Navigate to the dashboard or homepage
          router.push("/");
        } else {
          setErrorMessage("Failed to load profile. Please try again.");
        }
      } else {
        setErrorMessage(`Login failed: ${loginResponse.data.message}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          `Login failed: ${error.response?.data?.message || "Unknown error occurred."}`
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      
    }
    finally {
      setLoading(false); // Stop loading
    }
  };
  

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setErrorMessage(""); // Clear errors before login attempt
      handleLogin();
    }
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
          {errorMessage && (
            <p className="lg:text-xl md:text-base text-xs py-1 text-center md:text-start text-red-700">
              {errorMessage}
            </p>
          )}
          <Button
            variant="Filled"
            classNames="w-full flex justify-center"
            disable={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Submit"} {/* Show loading text */}
          </Button>
        </form>
        <p className="lg:text-xl md:text-base text-xs pt-6 text-center md:text-start">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#FF7F50] cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
