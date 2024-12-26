"use client";
import { useState } from "react";
import AppointmentHome from "@/components/Locations/Appointment/MemberOrNot/AppointmentHome";
import Service from "@/components/Locations/Appointment/Service/Service";
import Location from "@/components/Locations/Appointment/Location/Location";
import FinalBooking from "@/components/Locations/Appointment/FinalBooking/FinalBooking";
import axios from "axios";
import { easyAppointmentsService } from "@/services/easyAppointments";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

const ScheduleAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [appointmentData, setAppointmentData] = useState({
    clinicId: "",
    serviceName: "",
    state: "",
    city: "",
    address: "",
    appointmentDate: "",
    time: "",
  });

  interface ServiceType {
    id: number;
    name: string;
    duration: string;
  }

  const updateAppointmentData = (field: string, value: string) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateServiceData = (service: ServiceType) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      serviceName: service.name,
    }));
  };

  const steps = [
    { label: "Step 1: User Type", component: AppointmentHome },
    { label: "Step 2: Select Service", component: Service },
    { label: "Step 3: Choose Location", component: Location },
    { label: "Step 4: Confirm Booking", component: FinalBooking },
  ];

  const goToNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBookingSuccess = () => {
    // Show success message
    alert("Appointment booked successfully!");

    // Delay redirect slightly to ensure alert is seen
    setTimeout(() => {
      router.push("/profile");
    }, 500);
  };

  const bookAppointment = async () => {
    setIsLoading(true);
    try {
      // Log the current appointment data
      console.log("Current appointment data:", {
        date: appointmentData.appointmentDate,
        time: appointmentData.time,
        allData: appointmentData
      });

      // Validate required fields
      if (!appointmentData.appointmentDate || !appointmentData.time) {
        throw new Error('Please select both date and time for the appointment');
      }

      // Merge user data with appointment data
      const completeAppointmentData = {
        ...appointmentData,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phoneNo,
        dob: user.dob,
        induranceStatus: user.induranceStatus
      };

      console.log("Booking appointment with data:", {
        date: completeAppointmentData.appointmentDate,
        time: completeAppointmentData.time,
        allData: completeAppointmentData
      });

      const easyAppointmentResponse = await easyAppointmentsService.createAppointment(completeAppointmentData);
      console.log("EasyAppointments booking:", easyAppointmentResponse);

      // Handle successful booking
      handleBookingSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error booking appointment:", error.message);
        console.error("Response data:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      alert(error instanceof Error ? error.message : "Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentComponent = steps[activeStep].component;

  return (
    <div>
      <div className="flex flex-col items-center gap-10 mt-[120px] overflow-hidden">
        <h1 className="text-neutral-15 text-center font-Amiri lg:text-[64px] md:text-[48px] text-[36px] font-bold lg:leading-[90px] md:leading-[64px] leading-[42px]">
          Schedule Your Appointment Today
        </h1>
      </div>
      <div className="mt-10">
        <CurrentComponent
          goToNextStep={goToNextStep}
          updateAppointmentData={updateAppointmentData}
          onServiceSelect={updateServiceData}
          bookAppointment={bookAppointment}
          appointmentData={appointmentData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ScheduleAppointment;
