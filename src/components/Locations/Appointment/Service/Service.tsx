"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { AppDispatch, RootState } from "@/store";
import { fetchServices, setSelectedService } from "@/store/slices/serviceSlice";
import { formatDuration } from "@/utils/formatters";
import { Service as ServiceType } from "@/services/easyAppointments";
import { AppointmentData } from "@/types/appointment";

// Define the props for the Service component
interface ServiceProps {
  goToNextStep: () => void;
  onServiceSelect: (service: ServiceType) => void;
  updateAppointmentData: (field: keyof AppointmentData, value: string | number) => void;
}

const Service: React.FC<ServiceProps> = ({ goToNextStep, onServiceSelect, updateAppointmentData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.services);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleCardSelect = async (service: ServiceType) => {
    console.log('🎯 [DEBUG] Service Component - Selected Service:', service);
    setSelectedServiceId(service.id);
    
    // Update Redux state
    dispatch(setSelectedService(service));
    
    // Update appointment data
    updateAppointmentData("serviceId", service.id);
    updateAppointmentData("serviceName", service.name);
    
    // Notify parent component
    onServiceSelect(service);
    
    // Wait for state updates
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('🔄 [DEBUG] Service Component - Moving to next step with service:', service.name);
    goToNextStep();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm">
          <div className="text-center">Loading services...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 xl:gap-12 py-8 md:py-12 px-4 md:px-8 xl:px-12 rounded-2xl w-[90%] bg-[#EBFAFF] border border-[#333] shadow-sm">
        {/* Progress Bar */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 ${
                index < 2 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
              }`}
            ></div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center font-Amiri text-[32px] md:text-4xl lg:text-5xl font-bold leading-10 md:leading-[44px] xl:leading-[66px] my-8">
          What service are you visiting for?
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 xl:gap-8 w-full">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={{
                name: service.name,
                duration: formatDuration(service.duration)
              }}
              isSelected={selectedServiceId === service.id}
              onCardSelect={() => handleCardSelect(service)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
