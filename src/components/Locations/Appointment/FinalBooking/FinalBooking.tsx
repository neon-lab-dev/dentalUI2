"use client";
import { useState, useEffect } from "react";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust import paths



interface FinalBookingProps {
  bookAppointment: () => void;
  appointmentData: {
    clinicId: string;
    serviceName: string;
    state: string;
    city: string;
    address: string;
    appointmentDate: string;
    time: string;
  };
  isLoading: boolean;
}


const FinalBooking = ({ bookAppointment, appointmentData, isLoading }: FinalBookingProps) => {

  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [fname, setFname] = useState(user.first_name);
  const [lname, setLname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNo);
  const [dob, setDOB] = useState(user.dob);
  const [induranceStatus, setInduranceStatus] = useState(user.induranceStatus);

  useEffect(() => {
    setFname(user.first_name);
    setLname(user.last_name);
    setEmail(user.email);
    setPhone(user.phoneNo);
    setDOB(formatDate(user.dob)); // Format the date
    setInduranceStatus(user.induranceStatus);
    console.log(user)
  }, [user]);

  // Format the date to dd-mm-yyyy format
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleBooking = async () => {

    try {
      await bookAppointment();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-secondary-30 bg-opacity-75 flex items-end justify-center z-100">
          <div className="text-primary-10 font-Amiri h-fit w-fit flex justify-center items-center text-5xl font-bold bg-secondary-30 p-40 rounded-3xl shadow-2xl mb-40">
            Booking Appointment...
          </div>
        </div>
      )}
      {/* Booking Progress */}
      <div className={`flex flex-col ${isLoading ? "opacity-10" : ""} items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl md:rounded-[32px] xl:rounded-[48px] w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm`}>
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 ${index < 3 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
                }`}
            ></div>
          ))}
        </div>

        {/* Booking Confirmation */}
        <div className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px] ">
          Confirm Booking
        </div>
        <div className="w-full flex justify-between xl:py-5 xl:px-6 p-4  border border-[#333] rounded-2xl bg-[#F5F5DC] font-Poppins xl:text-[32px] md:text-[16px] text-[12px]">
          <div>
            Appointment for <span className="font-bold">{appointmentData.appointmentDate}</span>
          </div>
          <div>at {appointmentData.time}</div>
        </div>

        {/* Location and Treatment Info */}
        <div className="w-full flex flex-col md:flex-row  justify-between xl:mt-8 md:my-8 my-6 lg:gap-[34px] md:gap-5 gap-6 ">
          <div className="xl:px-[32px] xl:py-[24px] md:p-5 p-4 flex justify-between items-center shadow-sm bg-[#F5F5DC] rounded-3xl w-full">
            <div className="flex flex-col justify-between">
              <div className="font-Amiri font-bold xl:text-[32px] md:text-[20px] text-[16px] xl:leading-[48px] leading-6 md:leading-[30px]">
                {appointmentData.city}
              </div>
              <div className="h-[2px] bg-[#FF7F50] self-stretch my-[10px]"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px]">
                {appointmentData.address} <br /> {appointmentData.state}
              </div>
            </div>
          </div>
          <div className="xl:px-[32px] xl:py-[24px] md:p-5 p-4 flex justify-between items-center shadow-sm bg-[#FF7F50] rounded-3xl w-full">
            <div className="flex flex-col justify-between">
              <div className="font-Amiri font-bold xl:text-[32px] md:text-[20px] text-[16px] xl:leading-[48px] leading-6 md:leading-[30px]">
                {appointmentData.serviceName}
              </div>
              <div className="h-[2px] bg-[#F5F5DC] self-stretch my-[10px]"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px]">
                Duration: 40 minutes
              </div>
            </div>
          </div>
        </div>

        {/* Enter User Details */}
        <div className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]">
          Enter User Details
        </div>
        <div className="w-full flex flex-col xl:gap-8 md:gap-5 gap-4">
          {/* Name, Email, Phone, DOB, Insurance Fields */}
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
        </div>

        {/* Continue Booking Button */}
        <Button
          onClick={handleBooking}
          variant="Filled"
          classNames="w-full flex justify-center px-[28px] py-[14px]"
        >
          Continue Booking
        </Button>
      </div>
    </div>
  );
};

export default FinalBooking;
