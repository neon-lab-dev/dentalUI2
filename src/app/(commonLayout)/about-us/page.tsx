import Statement from "@/components/AboutUs/CEOStatement/Statement";
import FAQ from "@/components/AboutUs/FAQs/FAQ";
import AboutUsHero from "@/components/AboutUs/Hero/AboutUsHero";
import Journey from "@/components/AboutUs/SectionTwo/Journey";
import Teams from "@/components/AboutUs/Teams/Teams";
import Container from "@/components/shared/Container/Container";

const AboutUs = () => {
  return (
    <div>
      <Container>
        <AboutUsHero />
        <Journey />
        <Statement />
        <Teams />
        <FAQ />
      </Container>
    </div>
  );
};

export default AboutUs;
