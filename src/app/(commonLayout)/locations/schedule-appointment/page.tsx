"use client";
import { useState } from "react";
import AppointmentHome from "@/components/Locations/Appointment/MemberOrNot/AppointmentHome";
import Service from "@/components/Locations/Appointment/Service/Service";
import Location from "@/components/Locations/Appointment/Location/Location";
import FinalBooking from "@/components/Locations/Appointment/FinalBooking/FinalBooking";
import Container from "@/components/shared/Container/Container";

const ScheduleAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  const CurrentComponent = steps[activeStep].component;

  return (
    <Container>
      <div className="flex flex-col items-center gap-10 mt-[120px] overflow-hidden">
        <h1 className="text-neutral-15 text-center font-Amiri lg:text-[64px] md:text-[48px] text-[36px] font-bold lg:leading-[90px] md:leading-[64px] leading-[42px]">
          Schedule Your Appointment Today
        </h1>
      </div>
      <div className="mt-10">
        <CurrentComponent goToNextStep={goToNextStep} />
      </div>
    </Container>
  );
};

export default ScheduleAppointment;
