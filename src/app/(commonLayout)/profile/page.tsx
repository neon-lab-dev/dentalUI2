"use client";
import React, { useState,useEffect } from "react";
import Container from "@/components/shared/Container/Container";
import { fetchAppointments } from "@/store/slices/apppointmentSlice";
import InputField from "@/components/Form/InputField";
import {useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch  } from "@/store";
import AppointmentCard from "@/components/Profile/AppointmentCard";
import { clearUser } from "@/store/slices/userSlice";
import axios from "axios";

// Logout Button Component
const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      // Make the API call to logout
      await axios.get("https://dental-backend-three.vercel.app/api/v1/logout");

      // Dispatch the action to clear user data from Redux and localStorage
      dispatch(clearUser());

      // Optionally, you can also redirect the user to a login page
      window.location.href = "/login"; // Or use a router.push if using react-router
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="xl:mt-36 mt-8 bg-primary-20 text-[#F5F5DC] w-full border lg:px-[50px] lg:py-[22px] md:px-[36px] md:py-[16px] px-[18px] py-[8px] lg:text-[22px] md:text-[18px] text-sm font-Poppins font-semibold rounded-[55px] flex items-center justify-center gap-3 text-nowrap"
    >
      Logout
    </button>
  );
};

const MyAppointments = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { upcomingAppointments, previousAppointments, loading, error } =
    useSelector((state: RootState) => state.appointments);

  // Directly fetch token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) {
      dispatch(fetchAppointments({ token })); // Pass token explicitly
    }
  }, [dispatch, token]);

  // If token doesn't exist, prompt login
  if (!token) {
    return <div>Please log in to see your appointments.</div>;
  }

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render appointments
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Upcoming Appointments</h2>
      {upcomingAppointments.length > 0 ? (
        upcomingAppointments.map((appointment) => {
          const dateObj = new Date(appointment.appointmentDate); // Convert ISO string to Date object
          
          const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateObj.getFullYear()}`; // Convert to 'dd-mm-yyyy'
        
          const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj
            .getMinutes()
            .toString()
            .padStart(2, '0')}`; // Convert to 'hh:mm'
        
          return (
            <AppointmentCard
              key={appointment._id}
              service={appointment.serviceName}
              dateTime={`${formattedDate} ${formattedTime}`} // Pass formatted date and time
              location={`${appointment.address}, ${appointment.city}, ${appointment.state}`} // Pass location
            />
          );
        })
        
      ) : (
        <p>No upcoming appointments found.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-6">Previous Appointments</h2>
      {previousAppointments.length > 0 ? (
        previousAppointments.map((appointment) => {
          const dateObj = new Date(appointment.appointmentDate);
        
          const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateObj.getFullYear()}`;
        
          const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        
          return (
            <AppointmentCard
              key={appointment._id}
              service={appointment.serviceName}
              dateTime={`${formattedDate} ${formattedTime}`}
              location={`${appointment.address}, ${appointment.city}, ${appointment.state}`}
            />
          );
        })
        
      ) : (
        <p>No previous appointments found.</p>
      )}
    </div>
  );
};






const MyProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [fname, setFname] = useState(user.first_name);
  const [lname, setLname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNo);
  const [dob, setDOB] = useState(user.dob);
  const [induranceStatus, setInduranceStatus] = useState(user.induranceStatus);

  // Format the date to dd-mm-yyyy format
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Use effect to update the values if user data changes
  useEffect(() => {
    setFname(user.first_name);
    setLname(user.last_name);
    setEmail(user.email);
    setPhone(user.phoneNo);
    setDOB(formatDate(user.dob)); // Format the date
    setInduranceStatus(user.induranceStatus);
  }, [user]);

  return (
    <div>
      <form className="w-full mt-20">
        <div className="py-6 flex flex-col lg:gap-8 gap-4">
          <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
            <InputField
              id="firstname"
              name="fname"
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              value={fname}
              className="w-full"
              disabled
            />
            <InputField
              id="lastname"
              name="lname"
              label="Last Name"
              type="text"
              placeholder="Enter Last Name"
              value={lname}
              className="w-full"
              disabled
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
              className="w-full"
              disabled
            />
            <InputField
              id="phonenumber"
              name="phone"
              label="Phone Number"
              type="text"
              placeholder="Enter Phone Number"
              value={phone.toString()}  // Ensure it's a string
              className="w-full"
              disabled
            />
          </div>
          <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
            <InputField
              id="DOB"
              name="dob"
              label="Date Of Birth"
              type="text"
              placeholder="Enter Date Of Birth"
              value={dob}
              className="w-full"
              disabled
            />
            <InputField
              id="example-select"
              name="insurance"
              label="Select an Insurance"
              type="text"
              value={induranceStatus}
              className="w-full"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
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
            <LogoutButton />
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
