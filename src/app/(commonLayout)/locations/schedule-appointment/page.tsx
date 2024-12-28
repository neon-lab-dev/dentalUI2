/**
 * Main Schedule Appointment Page
 * 
 * This is the main page component for the appointment scheduling flow.
 * It manages a multi-step booking process including:
 * 1. User Type Selection (Member/Non-Member)
 * 2. Service Selection
 * 3. Location Selection
 * 4. Final Booking Confirmation
 * 
 * The component maintains the appointment state throughout the booking process
 * and coordinates between different sub-components.
 */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppointmentHome from "@/components/Locations/Appointment/MemberOrNot/AppointmentHome";
import Service from "@/components/Locations/Appointment/Service/Service";
import Location from "@/components/Locations/Appointment/Location/Location";
import FinalBooking from "@/components/Locations/Appointment/FinalBooking/FinalBooking";
import axios from "axios";
import { easyAppointmentsService } from "@/services/easyAppointments";

/**
 * Interface defining the structure of appointment data
 * Contains all necessary information for booking an appointment
 */
interface AppointmentData {
  clinicId: string;        // Unique identifier for the selected clinic
  serviceName: string;     // Name of the selected dental service
  state: string;          // State where the clinic is located
  city: string;           // City where the clinic is located
  address: string;        // Full address of the selected clinic
  appointmentDate: string; // Selected appointment date
  time: string;           // Selected appointment time
  first_name: string;     // Patient's first name
  last_name: string;      // Patient's last name
  email: string;          // Patient's email address
  phone: number;          // Patient's contact number
  dob?: string;           // Patient's date of birth (optional)
  induranceStatus?: string; // Patient's insurance status (optional)
}

/**
 * Interface for dental service type
 */
interface ServiceType {
  id: number;           // Unique identifier for the service
  name: string;         // Name of the service
  duration: string;     // Duration of the service
}

/**
 * Main component for the appointment scheduling page
 */
const ScheduleAppointment = () => {
  const router = useRouter();
  
  // Track the current step in the booking process
  const [activeStep, setActiveStep] = useState(0);
  
  // Loading state for API operations
  const [isLoading, setIsLoading] = useState(false);

  // Main state for appointment data
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    clinicId: "",
    serviceName: "",
    state: "",
    city: "",
    address: "",
    appointmentDate: "",
    time: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: 0,
  });

  /**
   * Updates a single field in the appointment data
   * @param field - The field to update
   * @param value - The new value
   */
  const updateAppointmentData = (field: string, value: string) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  /**
   * Updates the service-related data in the appointment
   * @param service - The selected service object
   */
  const updateServiceData = (service: ServiceType) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      serviceName: service.name,
    }));
  };

  // Define the steps in the booking process
  const steps = [
    { label: "Step 1: User Type", component: AppointmentHome },
    { label: "Step 2: Select Service", component: Service },
    { label: "Step 3: Choose Location", component: Location },
    { label: "Step 4: Confirm Booking", component: FinalBooking },
  ];

  /**
   * Advances to the next step in the booking process
   */
  const goToNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // Get the component for the current step
  const CurrentComponent = steps[activeStep].component;

  /**
   * Handles the final appointment booking process
   * Validates the data and submits it to the API
   * @param completeAppointmentData - The complete appointment data
   */
  const bookAppointment = async (completeAppointmentData: AppointmentData) => {
    setIsLoading(true);
    try {
      console.log("Complete appointment data:", completeAppointmentData);

      // Validate required fields
      const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'appointmentDate',
        'time',
        'clinicId',
        'serviceName',
        'state',
        'city',
        'address'
      ];

      const missingFields = requiredFields.filter(field => {
        const value = completeAppointmentData[field as keyof AppointmentData];
        const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
        if (isEmpty) {
          console.log(`Missing or empty field: ${field}`);
        }
        return isEmpty;
      });

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Create appointment in our backend first
      const backendResponse = await axios.post(
        "https://dental-backend-three.vercel.app/api/v1/book/new",
        completeAppointmentData,
        { withCredentials: true }
      );

      console.log("Backend booking successful:", backendResponse.data);

      // Set a timeout for Easy Appointments attempt
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Easy Appointments timeout')), 5000);
      });

      try {
        // Race between Easy Appointments request and timeout
        const easyAppointmentResponse = await Promise.race([
          easyAppointmentsService.createAppointment(completeAppointmentData),
          timeoutPromise
        ]);

        console.log("Easy Appointments booking successful:", easyAppointmentResponse);

        if (easyAppointmentResponse?.id) {
          await axios.patch(
            `https://dental-backend-three.vercel.app/api/v1/book/${backendResponse.data._id}`,
            { easyAppointmentId: easyAppointmentResponse.id },
            { withCredentials: true }
          );
        }
      } catch (easyAppointmentError) {
        // Just log the error but continue with success flow
        console.warn("Easy Appointments booking failed or timed out:", easyAppointmentError);
      }

      // Success flow - happens regardless of Easy Appointments result
      alert("Appointment booked successfully!");
      setIsLoading(false);  // Clear loading state before navigation
      router.push('/profile');

    } catch (error) {
      setIsLoading(false);  // Clear loading state before showing error
      console.error("Error in booking process:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to book appointment. Please try again.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    }
  };

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
