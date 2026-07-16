import React from "react";

/**
 * LocationSection
 * -----------------
 * "Visit Our Office" block for the ELDEC site — address, driving directions,
 * and an embedded map pin, styled to the existing ELDEC brand system:
 *   navy    #0D2137  (bg / ink)
 *   crimson #8B1A1A  (accent)
 *   cream   #F8F4F0  (panel bg)
 *   amber   #F59E0B  (highlight / signature)
 *   Bebas Neue   – headings
 *   Inter        – UI / labels
 *   IBM Plex Mono – coordinates, eyebrow tag
 *   Georgia      – body copy
 *
 * Drop into a page as <LocationSection />. No API key required — the map
 * uses the keyless Google Maps embed (maps.google.com/maps?q=...&output=embed).
 */

const ADDRESS = {
  line1: "5th Floor, Room 5A, Timschack House",
  line2: "Ngong Road, Dagoretti",
  line3: "Nairobi, Kenya",
};

const MAP_QUERY = "Timschack House, Ngong Road, Dagoretti, Nairobi";
const DIRECTIONS = [
  {
    label: "From Dagoretti Corner",
    text: "Head towards the city on Ngong Road. Timschack House sits on the right-hand side, a short distance past the corner — watch for the building signage set back from the road.",
  },
  {
    label: "From the CBD",
    text: "Take Ngong Road out towards Dagoretti Corner / Karen. Timschack House is on the left, before you reach the Dagoretti Corner junction.",
  },
  {
    label: "On arrival",
    text: "Enter the compound and take the lift or stairs to the 5th Floor. ELDEC's office is Room 5A.",
  },
];

function DirectionsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function LocationSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    MAP_QUERY
  )}`;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    MAP_QUERY
  )}&z=15&output=embed`;

  return (
    <section
      style={{
        backgroundColor: "#0D2137",
        color: "#F8F4F0",
        padding: "96px 24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F59E0B",
            marginBottom: 16,
          }}
        >
          1°17'44.0"S&nbsp;&nbsp;36°45'56.0"E
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 64px)",
            letterSpacing: "0.01em",
            lineHeight: 1,
            margin: "0 0 48px",
            color: "#F8F4F0",
          }}
        >
          Visit Our Office
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 380px) 1fr",
            gap: 48,
            alignItems: "start",
          }}
          className="eldec-location-grid"
        >
          {/* Left column: address + directions */}
          <div>
            {/* Address card */}
            <div
              style={{
                backgroundColor: "#F8F4F0",
                color: "#0D2137",
                padding: "28px 28px 24px",
                borderLeft: "4px solid #8B1A1A",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  color: "#8B1A1A",
                  marginBottom: 12,
                }}
              >
                <PinIcon />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Office Address
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 17,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {ADDRESS.line1}
                <br />
                {ADDRESS.line2}
                <br />
                {ADDRESS.line3}
              </p>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 22,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#0D2137",
                  color: "#F8F4F0",
                  textDecoration: "none",
                  padding: "12px 20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.02em",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8B1A1A")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0D2137")}
              >
                <DirectionsIcon />
                Get Directions
              </a>
            </div>

            {/* Turn-by-turn */}
            <div style={{ marginTop: 40 }}>
              {DIRECTIONS.map((step, i) => (
                <div
                  key={step.label}
                  style={{
                    display: "flex",
                    gap: 16,
                    paddingBottom: 24,
                    marginBottom: 24,
                    borderBottom:
                      i < DIRECTIONS.length - 1 ? "1px solid rgba(248,244,240,0.14)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 13,
                      color: "#F59E0B",
                      minWidth: 22,
                      paddingTop: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: "0.02em",
                        marginBottom: 6,
                        color: "#F8F4F0",
                      }}
                    >
                      {step.label}
                    </div>
                    <p
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "rgba(248,244,240,0.78)",
                        margin: 0,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: map */}
          <div
            style={{
              position: "relative",
              minHeight: 480,
              border: "1px solid rgba(248,244,240,0.16)",
            }}
          >
            <iframe
              title="ELDEC office location — Timschack House, Ngong Road, Dagoretti"
              src={embedSrc}
              width="100%"
              height="100%"
              style={{
                border: 0,
                position: "absolute",
                inset: 0,
                filter: "grayscale(0.25) contrast(1.05)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .eldec-location-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
