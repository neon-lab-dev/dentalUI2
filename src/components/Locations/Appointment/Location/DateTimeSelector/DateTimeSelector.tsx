"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Buttons/Button";
import Calender from "./Calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAppDispatch } from "@/store";
import { fetchAvailabilities } from "@/store/slices/availabilitySlice";
import { AppointmentData } from "@/types/appointment";
import { formatTimeForDisplay } from "@/utils/formatters";
import { showToast } from '@/utils/toast';

interface DatePickerPageProps {
  goToNextStep: () => void;
  selectedSubClinicId: string | null;
  updateAppointmentData: (field: keyof AppointmentData, value: string | number) => void;
}

const DatePickerPage: React.FC<DatePickerPageProps> = ({
  goToNextStep,
  selectedSubClinicId,
  updateAppointmentData,
}) => {
  const dispatch = useAppDispatch();
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const [dateSelected, setDateSelected] = useState(false);

  // Get services and availabilities from Redux store
  const selectedService = useSelector((state: RootState) => {
    const services = state.services.services;
    return services.length > 0 ? services[0] : null;
  });
  const { slots, loading, error } = useSelector((state: RootState) => state.availabilities);

  useEffect(() => {
    // Update service information when component mounts or service changes
    if (selectedService) {
      updateAppointmentData("serviceId", selectedService.id);
      updateAppointmentData("serviceName", selectedService.name);
    }
  }, [selectedService, updateAppointmentData]);

  const handleDateSelect = (date: Date) => {
    setDateSelected(true);
    setSelectedTime(null); // Reset selected time when date changes

    // Format the date to ISO string and keep only the date part
    const formattedDate = date.toISOString().split('T')[0];

    // Update the appointment data with the formatted date
    updateAppointmentData("appointmentDate", formattedDate);

    // Update provider ID
    if (selectedSubClinicId) {
      updateAppointmentData("providerId", parseInt(selectedSubClinicId));
    }

    // Fetch availabilities if we have all required data
    if (selectedSubClinicId && selectedService) {
      dispatch(fetchAvailabilities({
        providerId: parseInt(selectedSubClinicId),
        serviceId: selectedService.id,
        date: formattedDate
      }));
    }
  };

  const handleTimeClick = (timeStr: string) => {
    setSelectedTime(timeStr);
    console.log("Selected time:", timeStr);
    updateAppointmentData("time", timeStr);
  };

  const handleContinue = () => {
    if (!selectedTime) {
      showToast.error("Please select a time slot");
      return;
    }
    goToNextStep();
  };

  return (
    <div className="flex w-full justify-center items-center bg-transparent">
      <div className="w-full bg-transparent flex xl:flex-row flex-col gap-6 md:gap-8 justify-between">
        {/* Calendar Section */}
        <div className="flex-[4] xl:flex-[4]">
          <Calender onDateSelect={handleDateSelect} />
          {!dateSelected && (
            <p className="text-red-500 text-sm mt-2 text-center">Please select a date</p>
          )}
        </div>

        {/* Time Section */}
        <div className="flex-[6] xl:flex-[6]">
          <div className="flex flex-col gap-12">
            {loading ? (
              <p>Loading available time slots...</p>
            ) : error ? (
              <p className="text-red-500">Error loading time slots: {error}</p>
            ) : slots.length === 0 ? (
              <p>No available slots for the selected date.</p>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {slots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "Filled" : "Outlined"}
                      onClick={() => handleTimeClick(time)}
                      classNames={`w-full py-2 px-4 rounded-lg text-sm ${
                        selectedTime === time ? "text-black" : ""
                      }`}
                    >
                      {formatTimeForDisplay(time)}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="Filled"
                  onClick={handleContinue}
                  classNames="w-full py-3 rounded-lg mt-4"
                  disable={!selectedTime ? true : undefined}
                >
                  Continue
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerPage;
