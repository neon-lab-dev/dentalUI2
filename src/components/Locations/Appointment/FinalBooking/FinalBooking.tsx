/**
 * FinalBooking Component
 * 
 * This component handles the final step of the appointment booking process.
 * It displays a form with user details (pre-filled if available) and allows
 * the user to confirm their appointment booking.
 * 
 * @component
 */

"use client";
import { useState, useEffect } from "react";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

/**
 * Interface defining the structure of appointment data
 */
interface AppointmentData {
  clinicId: string;        // Unique identifier for the clinic
  serviceName: string;     // Name of the dental service
  state: string;          // State where the clinic is located
  city: string;           // City where the clinic is located
  address: string;        // Full address of the clinic
  appointmentDate: string; // Selected date for the appointment
  time: string;           // Selected time slot
  first_name: string;     // Patient's first name
  last_name: string;      // Patient's last name
  email: string;          // Patient's email address
  phone: number;          // Patient's contact number
  dob?: string;           // Patient's date of birth (optional)
  induranceStatus?: string; // Patient's insurance status (optional)
}

/**
 * Props interface for the FinalBooking component
 */
interface FinalBookingProps {
  bookAppointment: (appointmentData: AppointmentData) => Promise<void>; // Function to handle appointment booking
  appointmentData: Omit<AppointmentData, 'dob' | 'induranceStatus'>;   // Initial appointment data
  isLoading: boolean;     // Loading state during booking process
}

/**
 * FinalBooking component for confirming and submitting appointment details
 */
const FinalBooking = ({ bookAppointment, appointmentData, isLoading }: FinalBookingProps) => {
  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.user);

  // Local state for form fields
  const [fname, setFname] = useState(user.first_name);
  const [lname, setLname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNo);
  const [dob, setDOB] = useState(user.dob);
  const [induranceStatus, setInduranceStatus] = useState(user.induranceStatus);

  // Update form fields when user data changes
  useEffect(() => {
    setFname(user.first_name);
    setLname(user.last_name);
    setEmail(user.email);
    setPhone(user.phoneNo);
    setDOB(formatDate(user.dob));
    setInduranceStatus(user.induranceStatus);
  }, [user]);

  /**
   * Formats a date string to DD-MM-YYYY format
   * @param date - Date string to format
   * @returns Formatted date string
   */
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  /**
   * Handles the appointment booking submission
   * Combines form data with appointment details and calls the booking function
   */
  const handleBooking = async () => {
    try {
      const completeAppointmentData: AppointmentData = {
        ...appointmentData,
        first_name: fname,
        last_name: lname,
        email: email,
        phone: phone,
        dob: dob,
        induranceStatus: induranceStatus
      };
      
      await bookAppointment(completeAppointmentData);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center relative min-h-[800px]">
      {/* Loading Overlay - Displayed during the booking process */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 border-4 border-primary-10 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-2xl font-Amiri font-semibold text-primary-10">
              Booking Your Appointment...
            </div>
            <div className="text-sm text-gray-500 text-center">
              Please wait while we confirm your booking
            </div>
          </div>
        </div>
      )}

      {/* Main Booking Form */}
      <div className={`flex flex-col ${isLoading ? "opacity-50 pointer-events-none" : ""} transition-opacity duration-300 items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl md:rounded-[32px] xl:rounded-[48px] w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm`}>
        {/* Progress Bar - Shows current step in booking process */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 transition-all duration-500 ${
                index < 4 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
              }`}
            ></div>
          ))}
        </div>

        {/* Booking Confirmation */}
        <div className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]">
          Confirm Booking
        </div>

        {/* Appointment Time */}
        <div className="w-full flex justify-between xl:py-5 xl:px-6 p-4 border border-[#333] rounded-2xl bg-[#F5F5DC] font-Poppins xl:text-[32px] md:text-[16px] text-[12px] hover:shadow-md transition-shadow duration-300">
          <div>
            Appointment for <span className="font-bold">{appointmentData.appointmentDate}</span>
          </div>
          <div>at {appointmentData.time}</div>
        </div>

        {/* Location and Treatment Info */}
        <div className="w-full flex flex-col md:flex-row justify-between xl:mt-8 md:my-8 my-6 lg:gap-[34px] md:gap-5 gap-6">
          <div className="xl:px-[32px] xl:py-[24px] md:p-5 p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#F5F5DC] rounded-3xl w-full">
            <div className="flex flex-col justify-between w-full">
              <div className="font-Amiri font-bold xl:text-[32px] md:text-[20px] text-[16px] xl:leading-[48px] leading-6 md:leading-[30px]">
                {appointmentData.city}
              </div>
              <div className="h-[2px] bg-[#FF7F50] self-stretch my-[10px] transform origin-left transition-transform duration-300 hover:scale-x-110"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px]">
                {appointmentData.address} <br /> {appointmentData.state}
              </div>
            </div>
          </div>
          <div className="xl:px-[32px] xl:py-[24px] md:p-5 p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#FF7F50] rounded-3xl w-full">
            <div className="flex flex-col justify-between w-full">
              <div className="font-Amiri font-bold xl:text-[32px] md:text-[20px] text-[16px] xl:leading-[48px] leading-6 md:leading-[30px]">
                {appointmentData.serviceName}
              </div>
              <div className="h-[2px] bg-[#F5F5DC] self-stretch my-[10px] transform origin-left transition-transform duration-300 hover:scale-x-110"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px]">
                Duration: 40 minutes
              </div>
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]">
          User Details
        </div>
        <div className="w-full flex flex-col xl:gap-8 md:gap-5 gap-4">
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
                value={phone.toString()}
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
                label="Insurance Status"
                type="text"
                value={induranceStatus}
                className="w-full"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <Button
          onClick={handleBooking}
          variant="Filled"
          disable={isLoading}
          classNames={`w-full flex justify-center px-[28px] py-[14px] transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
        >
          {isLoading ? "Booking..." : "Book Appointment"}
        </Button>
      </div>
    </div>
  );
};

export default FinalBooking;
