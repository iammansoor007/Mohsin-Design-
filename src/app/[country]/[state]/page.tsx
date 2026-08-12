import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseMe from "@/components/WhyChooseMe";
import ServiceArea from "@/components/ServiceArea";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import { getStateData } from "@/lib/locations";

interface StatePageProps {
  params: Promise<{
    country: string;
    state: string;
  }>;
}

export default async function StatePage({ params }: StatePageProps) {
  const { country, state } = await params;
  const result = getStateData(country, state);

  if (!result) {
    notFound();
  }

  const { countryData, stateData } = result;

  return (
    <main className="flex-1 w-full">
      {/* 1. Hero Section */}
      <Hero data={stateData.hero || countryData.hero} />

      {/* 2. Services Section */}
      <Services data={stateData.services || countryData.services} />

      {/* 3. Selected Portfolio Projects */}
      <Portfolio data={stateData.portfolio || countryData.portfolio} />

      {/* 4. Why Choose Me */}
      <WhyChooseMe data={stateData.whyChooseMe || countryData.whyChooseMe} />

      {/* 5. Service Area */}
      <ServiceArea data={stateData.serviceArea || countryData.serviceArea} />

      {/* 6. Reviews / Testimonials */}
      <Testimonials data={stateData.testimonials || countryData.testimonials} />

      {/* 7. Blog Section */}
      <Blog data={stateData.blog || countryData.blog} />

      {/* 8. FAQ Section */}
      <FAQ data={stateData.faq || countryData.faq} />

      {/* 9. CTA Contact Form */}
      <ContactForm data={stateData.contact || countryData.contact} />
    </main>
  );
}
