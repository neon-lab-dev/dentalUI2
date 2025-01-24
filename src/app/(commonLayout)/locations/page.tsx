import ConvenientDentalCare from "@/components/Locations/ConvenientDentalCare/ConvenientDentalCare";
import LocationsHero from "@/components/Locations/LocationsHero/LocationsHero";
import ProvidersSection from "@/components/Locations/ProvidersSection/ProvidersSection";
import Container from "@/components/shared/Container/Container";

const page = () => {
    return (
        <div>
            <Container>
                <LocationsHero />
                <ConvenientDentalCare />
                <ProvidersSection />
            </Container>
        </div>
    );
};

export default page;