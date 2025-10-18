import type { Route } from "./+types/home";
import { BlockRenderer } from "../components/blocks";
import { ContactForm } from "../components/blocks/ContactForm";
import { getLandingPage } from "../lib/api";
import { handleApiError } from "../lib/utils";

export async function loader({}: Route.LoaderArgs) {
  const response = await getLandingPage();
  handleApiError(response, "landing page");
  if (!response?.data)
    throw new Response("Landing page not found", { status: 404 });
  return response.data;
}

export function meta({ loaderData }: Route.MetaArgs) {
  const landingPage = loaderData;
  
  return [
    { title: landingPage?.title || "Mortgages by Ram - Your Trusted Toronto Mortgage Agent" },
    { name: "description", content: landingPage?.description || "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service from Ram Singh, Licensed Mortgage Agent." },
    { name: "keywords", content: "mortgage agent Toronto, first time home buyer, mortgage refinancing, investment property mortgage, commercial mortgage, mortgage pre-approval, Toronto mortgage rates, licensed mortgage agent" },
    { name: "author", content: "Ram Singh" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    
    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:title", content: landingPage?.title || "Mortgages by Ram - Your Trusted Toronto Mortgage Agent" },
    { property: "og:description", content: landingPage?.description || "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service from Ram Singh, Licensed Mortgage Agent." },
    { property: "og:url", content: "https://mortgagesbyram.com" },
    { property: "og:site_name", content: "Mortgages by Ram" },
    { property: "og:locale", content: "en_CA" },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: landingPage?.title || "Mortgages by Ram - Your Trusted Toronto Mortgage Agent" },
    { name: "twitter:description", content: landingPage?.description || "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service from Ram Singh, Licensed Mortgage Agent." },
    
    // Additional SEO
    { name: "geo.region", content: "CA-ON" },
    { name: "geo.placename", content: "Toronto" },
    { name: "geo.position", content: "43.6532;-79.3832" },
    { name: "ICBM", content: "43.6532, -79.3832" },
    
    // Business/Local SEO
    { name: "business:contact_data:locality", content: "Toronto" },
    { name: "business:contact_data:region", content: "Ontario" },
    { name: "business:contact_data:country_name", content: "Canada" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const response = loaderData;

  return (
    <main>
      <BlockRenderer blocks={response.blocks} />
      {/* Fallback contact form - will be removed once added to Strapi content */}
      <ContactForm 
        id={999}
        __component="blocks.contact-form"
        heading="Get Pre-Approved Today"
        subheading="Take the first step towards your dream home. Get pre-approved in minutes with our quick and easy process."
        buttonText="Get Pre-Approved Now"
        showPhone={true}
        showMessage={true}
      />
    </main>
  );
}
