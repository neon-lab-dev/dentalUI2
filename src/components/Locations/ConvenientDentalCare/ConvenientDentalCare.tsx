import Heading from "@/components/shared/Heading/Heading";
import ConvenientDentalCareCard from "./ConvenientDentalCareCard";
import { IMAGES } from "@/assets";

const ConvenientDentalCare = () => {
    const convenientDentalCareDetails= [
        {
            _id : "124343423123443",
            img : IMAGES.location_1,
            name : "New York City",
            numberOfClinic : '12 Clinics'
        },
        {
            _id : "12434356424123443",
            img : IMAGES.location_2, 
            name : "Los Angeles",
            numberOfClinic : '12 Clinics'
        },
        {
            _id : "1243434123442343",
            img : IMAGES.location_3,
            name : "Houston",
            numberOfClinic : '12 Clinics'
        },
        {
            _id : "12434341234433",
            img : IMAGES.location_4,
            name : "Chicago",
            numberOfClinic : '12 Clinics'
        },
    ]
  return (
    <div className="mt-[120px]">
      <Heading aligned={"Center"} isHeadingCenter={true}>
        Convenient {" "}
        <span className="text-primary-10">Dental Care</span> Near You
      </Heading>

      <div className="grid md:grid-cols-2 grid-col-1 gap-4  lg:gap-8 mt-12">
        {
            convenientDentalCareDetails.map((details) => (
              <ConvenientDentalCareCard key={details._id} details={details} />
            ))
        }
      </div>
    </div>
  );
};

export default ConvenientDentalCare;
