import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProviders } from "@/store/slices/providerSlice";
import { RootState } from "@/store";
import { useAppDispatch } from "@/store";
import { IMAGES } from "@/assets";
import LocationCard from "./LocationCard";
import ClinicCard from "./ClinicCard";
import { StaticImageData } from "next/image";

interface LocationDataProps {
  setSelectedSubClinicId: (clinicId: string, state: string, city: string, address: string) => void;
}

// Map states to their respective images and display names
const stateConfig: { [key: string]: { img: StaticImageData; displayName: string } } = {
  "New York City": { img: IMAGES.location_1, displayName: "New York" },
  "Los Angeles": { img: IMAGES.location_2, displayName: "Los Angeles" },
  "Houston": { img: IMAGES.location_3, displayName: "Houston" },
  "Chicago": { img: IMAGES.location_4, displayName: "Chicago" }
};

const LocationData: React.FC<LocationDataProps> = ({ setSelectedSubClinicId }) => {
  const dispatch = useAppDispatch();
  const { providersByState, loading, error } = useSelector((state: RootState) => state.providers);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  // Get available states from providers and map them to location cards
  const availableStates = Object.keys(providersByState).filter(state => stateConfig[state]);
  
  const locationCards = availableStates.map(state => ({
    _id: state,
    img: stateConfig[state].img,
    name: stateConfig[state].displayName,
    numberOfClinic: `${providersByState[state]?.length || 0} Providers`,
  }));

  const handleMainCardClick = (stateId: string) => {
    setSelectedState(prevState => prevState === stateId ? null : stateId);
  };

  if (loading) return <div>Loading providers...</div>;
  if (error) return <div>Error loading providers: {error}</div>;

  return (
    <div>
      <div className="xl:flex justify-around xl:gap-8 grid grid-cols-2 grid-rows-2 gap-5">
        {locationCards.map((details) => (
          <LocationCard
            key={details._id}
            details={details}
            onMainCardClick={() => handleMainCardClick(details._id)}
            isMainCardSelected={selectedState === details._id}
          />
        ))}
      </div>

      <div className="w-full">
        {selectedState && providersByState[selectedState] && (
          <ClinicCard
            clinics={providersByState[selectedState].map(provider => ({
              _id: provider.id.toString(),
              state: provider.state || 'Unknown State',
              city: provider.city || 'Unknown City',
              address: provider.address || 'No Address Available'
            }))}
            onSubCardSelect={setSelectedSubClinicId}
          />
        )}
      </div>
    </div>
  );
};

export default LocationData;
