import { Helmet } from "react-helmet-async";
import { SITE_URL } from "./SEO";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "ELDEC Limited",
    alternateName: "ELDEC Engineering",
    description:
      "Electrical engineering and ELV (extra-low voltage) design consultancy based in Nairobi, Kenya, serving clients across Africa and the Middle East.",
    url: SITE_URL,
    telephone: "+254721387121",
    email: "designs@eldecengineering.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5th Floor, Room 5A, Timschack House, Ngong Road",
      addressLocality: "Dagoretti, Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    // TODO: confirm exact coordinates for the office
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2955,
      longitude: 36.7657,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Place", name: "Africa" },
      { "@type": "Place", name: "Middle East" },
    ],
    serviceType: [
      "Electrical Design & Consultancy",
      "Installation & Supervision",
      "EV Charging Station Design",
      "Solar & Backup Power Systems",
      "Data Center Electrical Design",
      "Technical Training",
    ],
    sameAs: [
      // "https://www.linkedin.com/company/eldec-limited",
      // "https://www.facebook.com/eldecengineering",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}