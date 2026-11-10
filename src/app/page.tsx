import { Hero } from "@/components/sections/hero";
import { Advantages } from "@/components/sections/advantages";
import { HowTo } from "@/components/sections/how-to";
import { Price } from "@/components/sections/price";
import { JsonLd } from "@/components/json-ld";
import { graph, serviceSchema, howToSchema, videoSchema, breadcrumbSchema } from "@/lib/schema";
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
          serviceSchema(),
          howToSchema(),
          videoSchema(),
          breadcrumbSchema([{ name: "Главная", path: "/" }]),
        ])}
      />
      <Hero />
      <Advantages />
      <HowTo />
      <Price />
    </>
  );
}
