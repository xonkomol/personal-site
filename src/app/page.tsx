import { Hero } from "@/components/sections/hero";
import { Pains } from "@/components/sections/pains";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Cases } from "@/components/sections/cases";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Geo } from "@/components/sections/geo";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/json-ld";
import {
  graph,
  faqSchema,
  serviceSchemas,
  reviewsSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site.config";

export const metadata = pageMetadata({
  title: site.seo.title,
  description: site.seo.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph([
          ...serviceSchemas(),
          faqSchema(),
          ...reviewsSchema(),
          breadcrumbSchema([{ name: "Главная", path: "/" }]),
        ])}
      />
      <Hero />
      <Pains />
      <Services />
      <Process />
      <Cases />
      <Pricing />
      <Testimonials />
      <Geo />
      <Faq />
      <FinalCta />
    </>
  );
}
