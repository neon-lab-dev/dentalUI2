"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinicById, clearSelectedClinic } from "@/store/slices/clinicSlice";
import { RootState, AppDispatch } from "@/store";
import Container from "@/components/shared/Container/Container";
import ClinicDetailsHero from "@/components/Locations/ClinicLocation/ClinicDetailsHero";
import Teams from "@/components/AboutUs/Teams/Teams";
import OurPartners from "@/components/Home/OurPartners/OurPartners";
import DentalService from "@/components/Services/DentalService/DentalService";

const ClinicDetailsPage = () => {
  const clinic_id = useParams()?.clinic_id as string; // Ensure `clinic_id` is a string
  const dispatch = useDispatch<AppDispatch>();

  const { selectedClinic, loading, error } = useSelector(
    (state: RootState) => state.clinic
  );

  useEffect(() => {
    if (clinic_id) {
      dispatch(fetchClinicById(clinic_id));
    }

    return () => {
      dispatch(clearSelectedClinic());
    };
  }, [dispatch, clinic_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-20">
      <Container>
        {selectedClinic ? (
          <>
            {/* Clinic Hero Section */}
            <ClinicDetailsHero
            state={selectedClinic.state}
  title={selectedClinic.city} // Replace with the correct property
  subtitle={`${selectedClinic.address} ${selectedClinic.city}, ${selectedClinic.state}`}
/>

            {/* Additional Sections */}
            <DentalService />
            <Teams />
            <OurPartners />
          </>
        ) : (
          <div>No clinic details found.</div>
        )}
      </Container>
    </div>
  );
};

export default ClinicDetailsPage;
