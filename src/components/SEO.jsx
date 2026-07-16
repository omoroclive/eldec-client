import { Helmet } from "react-helmet-async";

const SITE_NAME = "ELDEC Limited";
const SITE_URL = "https://www.eldecengineering.com"; // ⚠️ confirm this matches your live domain
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200x630 social preview image
const TWITTER_HANDLE = "@eldecengineering"; // update or remove if you don't have one

/**
 * <SEO /> — drop this at the top of every page component.
 *
 * Usage:
 *   <SEO
 *     title="Solar Mini Grid Design | ELDEC Limited"
 *     description="ELDEC designs and supervises solar mini grid installations across East Africa, built to IEC 60364 and KS 662 standards."
 *     path="/services/solar-mini-grids"
 *   />
 */
export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}) {
  const fullTitle = title ? `${title}` : `${SITE_NAME} | Electrical Engineering & ELV Design Consultancy`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };
