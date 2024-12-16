import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { fetchClinics } from "@/store/slices/clinicSlice";
import { RootState } from "@/store";
import { useAppDispatch } from "@/store";
import { IMAGES } from "@/assets";
import LocationCard from "./LocationCard";
import ClinicCard from "./ClinicCard";
import { GroupedClinics } from "@/store/slices/clinicSlice";
import { StaticImageData } from "next/image";



interface LocationDataProps {
  setSelectedSubClinicId: (clinicId: string, state: string, city: string, address: string) => void; // Accept 4 parameters
}


type GroupedClinicKeys = keyof GroupedClinics; // Restrict to the keys of GroupedClinics

const LocationData: React.FC<LocationDataProps> = ({ setSelectedSubClinicId }) =>  {
  const dispatch = useAppDispatch();
  const { groupedClinics, loading } = useSelector((state: RootState) => state.clinic);
  const [selectedCardId, setSelectedCardId] = useState<GroupedClinicKeys | null>(null); // Use GroupedClinicKeys

  const convenientDentalCareDetails: {  _id: GroupedClinicKeys;
    img: StaticImageData; name: string; numberOfClinic: string }[] = [
    {
      _id: "newYorkCity",
      img: IMAGES.location_1,
      name: "New York City",
      numberOfClinic: `${groupedClinics.newYorkCity.count} Clinics`,
    },
    {
      _id: "losAngeles",
      img: IMAGES.location_2,
      name: "Los Angeles",
      numberOfClinic: `${groupedClinics.losAngeles.count} Clinics`,
    },
    {
      _id: "houston",
      img: IMAGES.location_3,
      name: "Houston",
      numberOfClinic: `${groupedClinics.houston.count} Clinics`,
    },
    {
      _id: "chicago",
      img: IMAGES.location_4,
      name: "Chicago",
      numberOfClinic: `${groupedClinics.chicago.count} Clinics`,
    },
  ];

  useEffect(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  const handleMainCardClick = (id: GroupedClinicKeys) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="xl:flex justify-around xl:gap-8 grid grid-cols-2 grid-rows-2 gap-5 ">
        {convenientDentalCareDetails.map((details) => (
          <LocationCard
            key={details._id}
            details={details}
            onMainCardClick={() => handleMainCardClick(details._id)} 
            isMainCardSelected={selectedCardId === details._id} 
          />
        ))}
      </div>

      <div className="w-full">
        {/* Show ClinicCard only when any card is selected */}
        {selectedCardId && <ClinicCard clinics={groupedClinics[selectedCardId].clinics} onSubCardSelect={setSelectedSubClinicId}  />}
      </div>
    </div>
  );
};

export default LocationData;
