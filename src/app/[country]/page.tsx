import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import AboutOwner from "@/components/AboutOwner";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseMe from "@/components/WhyChooseMe";
import ServiceArea from "@/components/ServiceArea";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import { getCountryData } from "@/lib/locations";

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await params;
  const countryData = getCountryData(country);

  if (!countryData) {
    notFound();
  }

  return (
    <main className="flex-1 w-full">
      {/* 1. Hero Section */}
      <Hero data={countryData.hero} />

      {/* 2. About The Owner */}
      <AboutOwner data={countryData.aboutOwner} />

      {/* 3. Services Section */}
      <Services data={countryData.services} />

      {/* 4. Selected Portfolio Projects */}
      <Portfolio data={countryData.portfolio} />

      {/* 5. Why Choose Me */}
      <WhyChooseMe data={countryData.whyChooseMe} />

      {/* 6. Service Area */}
      <ServiceArea data={countryData.serviceArea} />

      {/* 7. Reviews / Testimonials */}
      <Testimonials data={countryData.testimonials} />

      {/* 8. Blog Section */}
      <Blog data={countryData.blog} />

      {/* 9. FAQ Section */}
      <FAQ data={countryData.faq} />

      {/* 10. CTA Contact Form */}
      <ContactForm data={countryData.contact} />
    </main>
  );
}
