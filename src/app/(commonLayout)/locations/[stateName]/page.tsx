"use client";

import ClinicLocationHero from "@/components/Locations/ClinicLocation/ClinicLocationHero";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinics } from "@/store/slices/clinicSlice";
import { AppDispatch, RootState } from "@/store";
import Container from "@/components/shared/Container/Container";
import ClinicCards from "@/components/Locations/ClinicLocation/ClinicCards";
import Heading from "@/components/shared/Heading/Heading";

// Function to capitalize each word and replace hyphens with spaces
const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const ClinicLocationPage = () => {
  const params = useParams();
  const { stateName } = useParams(); 
  console.log(stateName)
  

  const dispatch = useDispatch<AppDispatch>(); // Hook called unconditionally
  const { clinics, loading, error } = useSelector(
    (state: RootState) => state.clinic
  );

  useEffect(() => {
    if (stateName) {
      dispatch(fetchClinics());
    }
  }, [dispatch, stateName]);

  // Early return for invalid params
  if (!params.stateName || Array.isArray(params.stateName)) {
    return <div>City not found</div>;
  }

  // Filter clinics for the specific state
  const filteredClinics = clinics.filter(
    (clinic) => clinic.state.toLowerCase().replace(/\s+/g, "-") === stateName
  );

  const stateNameTitleCase = toTitleCase(params.stateName); // Convert to "New York City"

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
            Convenient Dental{" "}
            <span className="text-primary-10">Dental Care</span> You
          </Heading>
          <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   ">
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
              filteredClinics.map((clinic) => (
                <ClinicCards key={clinic._id} city={clinic.city} clinic_id={clinic._id} />
              ))
            )}
          </div>
          </div>
          
        </div>
        </div>
        
      </Container>
    </div>
  );
};

export default ClinicLocationPage;
