"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Buttons/Button";
import Calender from "./Calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface DatePickerPageProps {
  goToNextStep: () => void;
  selectedSubClinicId: string | null;
  updateAppointmentData: (field: string, value: string) => void; // Callback to update appointment data
}

const DatePickerPage: React.FC<DatePickerPageProps> = ({
  goToNextStep,
  selectedSubClinicId,
  updateAppointmentData,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ time: string; isBooked: boolean; _id: string }>
  >([]);
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const clinics = useSelector((state: RootState) => state.clinic.clinics);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);

    // Format the date to ISO string and keep only the date part
    const formattedDate = date.toISOString().split('T')[0];
    console.log("Formatted date:", formattedDate);

    // Update the appointment data with the formatted date
    updateAppointmentData("appointmentDate", formattedDate);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    console.log("Selected time:", time);

    // Update the appointment data with the time
    updateAppointmentData("time", time);
  };

  useEffect(() => {
    if (selectedSubClinicId) {
      const clinic = clinics.find((c) => c._id === selectedSubClinicId);

      if (clinic && selectedDate) {
        const scheduleForDate = clinic.schedule.find(
          (schedule) =>
            new Date(schedule.date).toISOString().split("T")[0] ===
            new Date(selectedDate).toISOString().split("T")[0]
        );

        if (scheduleForDate) {
          setAvailableSlots(scheduleForDate.slots);
        } else {
          setAvailableSlots([]); // No slots available for the selected date
        }
      }
    }
  }, [selectedSubClinicId, selectedDate, clinics]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex w-full justify-center items-center bg-transparent">
      <div className="w-full bg-transparent flex xl:flex-row flex-col gap-6 md:gap-8 justify-between">
        {/* Calendar Section */}
        <div className="flex-[4] xl:flex-[4] flex-1">
          <Calender onDateSelect={handleDateSelect} />
        </div>

        {/* Time Section */}
        <div className="flex-[6] xl:flex-[6] flex-1">
          <div className="flex flex-col gap-12">
            {/* Time Section */}
            {availableSlots.length <= 0 ? (
              <p>No available slots for the selected date.</p>
            ) : (
              <div className="bg-transparent p-4 grid xl:grid-cols-4 grid-cols-3 gap-6">
                {availableSlots.length > 0
                  ? availableSlots.map((slot) => (
                    <Button
                      key={slot._id}
                      disable={slot.isBooked}
                      onClick={() => handleTimeClick(slot.time)}
                      variant={
                        selectedTime === slot.time ? "Filled" : "Outlined"
                      }
                    >
                      {slot.time}
                    </Button>
                  ))
                  : ""}
              </div>
            )}

            {/* Display Selected Date-Time */}
            <div>
              <p className="flex gap-10 xl:px-6 p-4 border border-neutral-10 rounded-2xl bg-secondary-30 font-Poppins lg:text-[32px] md:text-2xl text-xs">
                <span className="font-Poppins">
                  {formatDate(selectedDate)}{" "}
                </span>
                <span className="text-neutral-10">
                  {selectedTime &&
                    availableSlots.length > 0 &&
                    ` ${selectedTime}`}
                </span>
              </p>
            </div>
          </div>

          <Button
            variant="Filled"
            onClick={goToNextStep} // Ensure this function is correctly passed and exists
            classNames="w-full flex justify-center mt-12 px-[28px] py-[14px]"
            disable={!selectedTime} // Disable the button if no time is selected
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerPage;
