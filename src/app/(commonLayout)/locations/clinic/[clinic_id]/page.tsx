"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import Container from "@/components/shared/Container/Container";
import ClinicDetailsHero from "@/components/Locations/ClinicLocation/ClinicDetailsHero";
import Teams from "@/components/AboutUs/Teams/Teams";
import OurPartners from "@/components/Home/OurPartners/OurPartners";
import DentalService from "@/components/Services/DentalService/DentalService";
import ClinicInfo from "@/components/Locations/ClinicLocation/ClinicInfo";
import { fetchProviders } from "@/store/slices/providerSlice";
import { easyAppointmentsService } from "@/services/easyAppointments";
import FinalBooking from "@/components/Locations/Appointment/FinalBooking/FinalBooking";
import { AppointmentData, PartialAppointmentData, RequiredAppointmentFields } from "@/types/appointment";
import DateTimeSelector from "@/components/Locations/Appointment/Location/DateTimeSelector/DateTimeSelector";
import { showToast } from '@/utils/toast';

const ClinicDetailsPage = () => {
  const clinic_id = useParams()?.clinic_id as string;
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState<PartialAppointmentData>({});
  const [currentStep, setCurrentStep] = useState(1);

  const { providersByState, loading, error } = useSelector(
    (state: RootState) => state.providers
  );

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  // Find the provider from all states
  const provider = Object.values(providersByState)
    .flat()
    .find(p => p.id.toString() === clinic_id);

  const handleBookAppointment = async (appointmentData: AppointmentData) => {
    console.log('🔄 Starting appointment booking process...', appointmentData);
    setIsLoading(true);
    try {
      await easyAppointmentsService.bookAppointment(appointmentData);
      console.log('✅ Appointment booked successfully!');
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error('🚨 Appointment booking failed:', error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointmentData = (field: keyof AppointmentData, value: string | number) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const goToNextStep = () => {
    // Validate required fields before moving to next step
    if (currentStep === 1) {
      const requiredFields: (keyof RequiredAppointmentFields)[] = ['serviceId', 'providerId', 'appointmentDate', 'time'];
      const missingFields = requiredFields.filter(field => !appointmentData[field]);
      
      if (missingFields.length > 0) {
        showToast.error(`Please select all required appointment details: ${missingFields.join(', ')}`);
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!provider) return <div>No clinic details found.</div>;

  const locationInfo = {
    address: provider.address || '',
    city: provider.city || '',
    state: provider.state || '',
  };

  const hasRequiredFields = (data: PartialAppointmentData): data is RequiredAppointmentFields => {
    return !!(data.serviceId && data.providerId && data.appointmentDate && data.time);
  };

  return (
    <div className="pt-20">
      <Container>
        <>
          {/* Clinic Hero Section */}
          <ClinicDetailsHero
            state={locationInfo.state}
            title={locationInfo.city}
            subtitle={`${locationInfo.address} ${locationInfo.city}, ${locationInfo.state}`}
          />
          
          {/* Booking Flow */}
          {currentStep === 1 && (
            <DateTimeSelector
              goToNextStep={goToNextStep}
              selectedSubClinicId={clinic_id}
              updateAppointmentData={updateAppointmentData}
            />
          )}
          
          {currentStep === 2 && hasRequiredFields(appointmentData) && (
            <FinalBooking
              bookAppointment={handleBookAppointment}
              appointmentData={{
                ...appointmentData,
                ...locationInfo
              }}
              isLoading={isLoading}
            />
          )}
          
          {/* Additional Sections */}
          <ClinicInfo />
          <DentalService />
          <Teams />
        </>
      </Container>
      <OurPartners />
    </div>
  );
};

export default ClinicDetailsPage;
