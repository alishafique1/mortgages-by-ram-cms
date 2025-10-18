import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Navigation, navigationLoader } from "./components/custom/Navigation";
import { Footer } from "./components/custom/Footer";
import { ErrorBoundary as CustomErrorBoundary } from "./components/custom/ErrorBoundary";
import { ChatWidget } from "./components/custom/ChatWidget";
import { PreApprovalModalProvider, usePreApprovalModal } from "./contexts/PreApprovalModalContext";
import { PreApprovalModal } from "./components/custom/PreApprovalModal";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = navigationLoader;

export function Layout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Mortgages by Ram",
    "description": "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service from Ram Singh, Licensed Mortgage Agent.",
    "url": "https://mortgagesbyram.com",
    "logo": "https://mortgagesbyram.com/logo.png",
    "image": "https://mortgagesbyram.com/hero-image.jpg",
    "telephone": "+1-416-XXX-XXXX",
    "email": "info@mortgagesbyram.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.6532",
      "longitude": "-79.3832"
    },
    "areaServed": {
      "@type": "City",
      "name": "Toronto"
    },
    "serviceType": "Mortgage Services",
    "provider": {
      "@type": "Person",
      "name": "Ram Singh",
      "jobTitle": "Licensed Mortgage Agent",
      "description": "Licensed mortgage agent with over 8 years of experience in Toronto's competitive real estate market."
    },
    "sameAs": [
      "https://linkedin.com/in/ramsinghmortgage",
      "https://facebook.com/mortgagesbyram",
      "https://twitter.com/mortgagesbyram"
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent() {
  const { isOpen, closeModal } = usePreApprovalModal();
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <PreApprovalModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

export default function App() {
  return (
    <PreApprovalModalProvider>
      <AppContent />
    </PreApprovalModalProvider>
  );
}

export { CustomErrorBoundary as ErrorBoundary };
