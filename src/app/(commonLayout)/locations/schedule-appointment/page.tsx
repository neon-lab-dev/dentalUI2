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
import { useState, useEffect } from "react";
import AppointmentHome from "@/components/Locations/Appointment/MemberOrNot/AppointmentHome";
import Service from "@/components/Locations/Appointment/Service/Service";
import Location from "@/components/Locations/Appointment/Location/Location";
import FinalBooking from "@/components/Locations/Appointment/FinalBooking/FinalBooking";
import { Service as ServiceType } from "@/services/easyAppointments";
import { easyAppointmentsService } from "@/services/easyAppointments";
import { AppointmentData, RequiredAppointmentFields } from "@/types/appointment";
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';

/**
 * Main component for the appointment scheduling page
 */
const ScheduleAppointment = () => {
  // Track the current step in the booking process
  const [activeStep, setActiveStep] = useState(0);
  
  // Main state for appointment data
  const [appointmentData, setAppointmentData] = useState<Partial<AppointmentData>>({});

  // Debug: Log appointment data changes
  useEffect(() => {
    console.log('🔄 [DEBUG] Appointment Data Updated:', appointmentData);
  }, [appointmentData]);

  /**
   * Updates a single field in the appointment data
   * @param field - The field to update
   * @param value - The new value
   */
  const updateAppointmentData = (field: keyof AppointmentData, value: string | number) => {
    console.log(`🔄 [DEBUG] Updating ${field}:`, value);
    setAppointmentData((prevData) => {
      const newData = {
        ...prevData,
        [field]: value,
      };
      console.log('📝 [DEBUG] New appointment data:', newData);
      return newData;
    });
  };

  /**
   * Updates the service-related data in the appointment
   * @param service - The selected service object
   */
  const updateServiceData = (service: ServiceType) => {
    console.log('🔍 [DEBUG] Updating Service Data:', service);
    setAppointmentData((prevData) => {
      const newData = {
        ...prevData,
        serviceId: service.id,
        serviceName: service.name,
      };
      console.log('✅ [DEBUG] Updated Service Data:', newData);
      return newData;
    });
  };

  /**
   * Updates the clinic-related data in the appointment
   * @param clinicId - Selected clinic ID
   * @param state - Clinic's state
   * @param city - Clinic's city
   * @param address - Clinic's address
   */
  const updateClinicData = (
    clinicId: string,
    state: string,
    city: string,
    address: string
  ) => {
    updateAppointmentData("state", state);
    updateAppointmentData("city", city);
    updateAppointmentData("address", address);
  };

  /**
   * Checks if the appointment data has all required fields
   * @param data - The appointment data to check
   */
  const hasRequiredFields = (data: Partial<AppointmentData>): data is RequiredAppointmentFields => {
    return !!(data.serviceId && data.providerId && data.appointmentDate && data.time);
  };

  /**
   * Moves to the next step in the booking process
   */
  const goToNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  /**
   * Goes back to the previous step
   */
  const goToPreviousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const router = useRouter();

  /**
   * Handles the final appointment booking
   */
  const handleBookAppointment = async (completeAppointmentData: AppointmentData) => {
    console.log('✅ [PAGE] Starting booking process with data:', completeAppointmentData);
    
    try {
      const isConfirmed = await easyAppointmentsService.bookAppointment(completeAppointmentData);
      console.log('✅ [PAGE] Booking service returned:', isConfirmed);
      
      if (!isConfirmed) {
        console.log('❌ [PAGE] Appointment not confirmed');
        showToast.error('Appointment could not be confirmed. Please try again.');
        return;
      }
      
      // Show success and redirect
      console.log('✅ [PAGE] Booking successful, showing toast and redirecting...');
      showToast.success('Appointment booked successfully! You will receive a confirmation email shortly.');
      
      // Delay redirect slightly to allow toast to be seen
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.log('❌ [PAGE] Error in booking process:', error);
      const message = error instanceof Error ? error.message : 'Failed to book appointment. Please try again.';
      showToast.error(message);
      throw error; // Re-throw to let FinalBooking handle it
    }
  };

  // Render the appropriate component based on the current step
  const renderCurrentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <AppointmentHome
            goToNextStep={goToNextStep}
          />
        );
      case 1:
        return (
          <Service
            goToNextStep={goToNextStep}
            onServiceSelect={updateServiceData}
            updateAppointmentData={updateAppointmentData}
          />
        );
      case 2:
        return (
          <Location
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            onClinicSelect={updateClinicData}
            updateAppointmentData={updateAppointmentData}
          />
        );
      case 3:
        return hasRequiredFields(appointmentData) ? (
          <FinalBooking
            bookAppointment={handleBookAppointment}
            appointmentData={appointmentData}
          />
        ) : (
          <div>Missing required fields. Please go back and fill in all required information.</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-20">
      {renderCurrentStep()}
    </div>
  );
};

export default ScheduleAppointment;
