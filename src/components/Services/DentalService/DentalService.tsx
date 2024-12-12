import Heading from "@/components/shared/Heading/Heading";
import DentalServiceCard from "./DentalServiceCard";
import { IMAGES } from "@/assets";

const DentalService = () => {
  const dentalServiceData1 = [
    {
      img: IMAGES.patient,
      title: "First Visit to Dentologie",
      content:
        "Your first visit is all about getting to know you and your dental needs. We’ll perform a thorough exam, take any necessary X-rays, and discuss a personalized treatment plan to keep your smile healthy. Experience comfortable, patient-centered care from day one.",
      category: "Latest",
    },
  ];
  const dentalServiceData = [
    {
      img: IMAGES.patient4,
      title: "Emergency Exam",
      content:
        "Experiencing dental pain or an urgent issue? Our emergency exam offers prompt care to diagnose and address your dental concerns. Whether it’s a toothache, injury, or swelling, we’re here to provide quick relief and expert solutions. ",
      category: "Latest",
    },
    {
      img: IMAGES.patient2,
      title: "Invisalign",
      content:
        "Straighten your smile discreetly with Invisalign clear aligners. These custom-made, virtually invisible trays gradually shift your teeth without the need for traditional braces. Enjoy a comfortable and convenient way to achieve a confident, beautiful smile. ",
      category: "Hot",
    },
    {
      img: IMAGES.patient3,
      title: "Teeth Whitening",
      content:
        "Brighten your smile with professional teeth whitening treatments. Our safe and effective solutions remove stains and discoloration, giving you a radiant, refreshed look in just one visit.",
      category: "Trending",
    },
    {
      img: IMAGES.patient1,
      title: "Teeth Implants",
      content:
        "Restore your smile and confidence with dental implants. Our durable, natural-looking implants replace missing teeth, providing a long-lasting solution that feels and functions just like your own. ",
      category: "Popular",
    },
  ];
  return (
    <div className="mt-[120px]">
      <Heading aligned={"Center"} isHeadingCenter={true}>
        Our Range of <span className="text-primary-10">Dental Services</span>
      </Heading>
      <p className="text-neutral-10 font-Poppins md:text-xl sm:text-base text-xs max-w-[1058px] w-full mx-auto text-center flex-1 mt-8">
        With state-of-the-art facilities and a caring team, our clinics are
        designed for your comfort and convenience. Find the nearest location and
        schedule your visit today.
      </p>

      <hr className="border border-neutral-15 mt-12" />

      <div className="mt-[98px]">
        {/* Rendering the first card */}
        {dentalServiceData1.map((service, index) => (
          <DentalServiceCard
            key={index}
            img={service.img}
            title={service.title}
            content={service.content}
            isFullWidth
            isBtnVisible={true}
          />
        ))}

        {/* Renderin rest of the cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {dentalServiceData.map((service, index) => (
            <DentalServiceCard
              key={index}
              img={service.img}
              title={service.title}
              content={service.content}
              isBtnVisible={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DentalService;
