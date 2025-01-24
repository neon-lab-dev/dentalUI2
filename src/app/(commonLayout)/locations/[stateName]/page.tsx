"use client";

import ClinicLocationHero from "@/components/Locations/ClinicLocation/ClinicLocationHero";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Container from "@/components/shared/Container/Container";
import ClinicCards from "@/components/Locations/ClinicLocation/ClinicCards";
import Heading from "@/components/shared/Heading/Heading";
import ServiceSection from "@/components/Locations/ClinicLocation/ServiceSection";
import { fetchProviders } from "@/store/slices/providerSlice";

// Function to capitalize each word and replace hyphens with spaces
const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

// Function to normalize state names for comparison
const normalizeStateName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const ClinicLocationPage = () => {
  const params = useParams();
  const { stateName } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { providersByState, loading, error } = useSelector(
    (state: RootState) => state.providers
  );

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  // Early return for invalid params
  if (!params.stateName || Array.isArray(params.stateName)) {
    return <div>Location not found</div>;
  }

  const stateNameTitleCase = toTitleCase(params.stateName);
  
  // Get providers for the current state
  const currentStateProviders = Object.entries(providersByState)
    .find(([state]) => normalizeStateName(state) === stateName)?.[1] || [];

  return (
    <div className="pt-20">
      <Container>
        <div className="flex flex-col gap-10">
          <ClinicLocationHero stateName={stateNameTitleCase} />
          <div className="">
            <Heading
              aligned={"Center"}
              isHeadingCenter={false}
              headingWidth={`max-w-[600px] 2xl:max-w-[744px]`}
            >
              Convenient{" "}
              <span className="text-primary-10">Dental Care</span> Near You
            </Heading>
            <div className="py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  // Placeholder Cards while loading
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-96 bg-gray-300 animate-pulse rounded-3xl"
                    ></div>
                  ))
                ) : error ? (
                  // Error State
                  <div className="text-center col-span-full text-red-500">
                    Error: {error}
                  </div>
                ) : (
                  // Actual Cards
                  currentStateProviders.map((provider) => (
                    <ClinicCards
                      key={provider.id}
                      city={provider.city || 'Unknown City'}
                      clinic_id={provider.id.toString()}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ServiceSection />
    </div>
  );
};

export default ClinicLocationPage;
