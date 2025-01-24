"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Heading from "@/components/shared/Heading/Heading";
import ConvenientDentalCareCard from "./ConvenientDentalCareCard";
import { IMAGES } from "@/assets";
import { fetchProviders } from "@/store/slices/providerSlice";
import { StaticImageData } from "next/image";

interface StateConfig {
  img: StaticImageData;
  displayName: string;
}

// Map of state names to their display names and images
const stateConfig: Record<string, StateConfig> = {
  "New York City": { img: IMAGES.location_1, displayName: "New York City" },
  "Los Angeles": { img: IMAGES.location_2, displayName: "Los Angeles" },
  "Houston": { img: IMAGES.location_3, displayName: "Houston" },
  "Chicago": { img: IMAGES.location_4, displayName: "Chicago" }
} as const;

const ConvenientDentalCare = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { providersByState, loading, error } = useSelector((state: RootState) => state.providers);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  // Create location cards data from providers
  const convenientDentalCareDetails = Object.entries(providersByState)
    .filter(([state]) => state in stateConfig) // Type-safe way to check if state exists in config
    .map(([state, providers]) => ({
      _id: state,
      img: stateConfig[state].img,
      name: stateConfig[state].displayName,
      numberOfClinic: `${providers.length} Clinic${providers.length !== 1 ? 's' : ''}`
    }));

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-[120px]">
      <Heading aligned={"Center"} isHeadingCenter={true}>
        Convenient {" "}
        <span className="text-primary-10">Dental Care</span> Near You
      </Heading>

      <div className="grid md:grid-cols-2 grid-col-1 gap-4 lg:gap-8 mt-12">
        {convenientDentalCareDetails.map((details) => (
          <ConvenientDentalCareCard key={details._id} details={details} />
        ))}
      </div>
    </div>
  );
};

export default ConvenientDentalCare;
