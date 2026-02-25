"use client";

import { useState } from "react";
import {
  Scale,
  Building2,
  FileCheck,
  Mail,
  Phone,
  Check,
  ArrowUpRight,
  User,
} from "lucide-react";

export default function TTAdvDemo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        background: "#FAFAF9",
        color: "#0A0A0A",
        minHeight: "100vh",
      }}
    >
      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250,250,249,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E5E3DF",
          padding: "0 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <a
          href="#"
          style={{
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            textDecoration: "none",
          }}
        >
          tt<span style={{ color: "#1B3A6B" }}>adv</span>
        </a>

        <div
          style={{ display: "flex", gap: 36, alignItems: "center" }}
          className="nav-links"
        >
          <NavLink href="#tjenester">Tjenester</NavLink>
          <NavLink href="#om">Om</NavLink>
          <NavLink href="#kontakt">Kontakt</NavLink>
        </div>

        <a
          href="#kontakt"
          style={{
            background: "#0A0A0A",
            color: "#fff",
            padding: "10px 22px",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: "-0.01em",
          }}
        >
          Book samtale
          <ArrowUpRight size={15} />
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "80px 5vw 60px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
          minHeight: "calc(100vh - 68px)",
        }}
        className="hero-grid"
      >
        {/* Left: Text */}
        <div>


          <h1
            style={{
              fontSize: "clamp(40px, 5.5vw, 70px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: "0 0 24px",
            }}
          >
            Presis juridisk
            <br />
            <span style={{ color: "#1B3A6B" }}>rådgivning.</span>
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "#555",
              lineHeight: 1.7,
              maxWidth: 440,
              marginBottom: 40,
            }}
          >
            Vi kombinerer teknisk dyktighet og praktisk forretningsforståelse for
            å gi gründere, investorer og vekstselskaper presise og
            handlingsorienterte råd innen skatt, selskapsstruktur og regulatorisk
            etterlevelse.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#kontakt"
              style={{
                background: "#0A0A0A",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: "-0.01em",
              }}
            >
              Book en samtale
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#tjenester"
              style={{
                background: "transparent",
                color: "#0A0A0A",
                padding: "14px 28px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "1.5px solid #D5D3CF",
                letterSpacing: "-0.01em",
              }}
            >
              Se tjenester
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 64,
              paddingTop: 40,
              borderTop: "1px solid #E5E3DF",
            }}
          >
            <Stat number="PhD" label="Akademisk bakgrunn" />
            <Stat number="2025" label="Etablert" accent />
            <Stat number="100%" label="Fokus på klienten" />
          </div>
        </div>

        {/* Right: Portrait */}
        <div
          className="portrait-wrapper"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {/* Background shape */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              right: "0%",
              width: "80%",
              height: "88%",
              background: "#1B3A6B",
              borderRadius: 24,
              zIndex: 0,
            }}
          />

          {/* Portrait — constrained size so low-res image stays sharp */}
          <div
            className="portrait-container"
            style={{
              position: "relative",
              zIndex: 1,
              width: "62%",
              maxWidth: 340,
              aspectRatio: "4/5",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
            }}
          >
            <img
              src="/ttadv-portrait.jpg"
              alt="Tormod Torvanger"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement!;
                parent.style.background =
                  "linear-gradient(160deg, #1B3A6B 0%, #2D5FA6 100%)";
                parent.innerHTML = `
                  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:white;gap:12px;padding:24px;text-align:center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    <div style="font-weight:700;font-size:16px">Tormod Torvanger</div>
                    <div style="font-size:11px;opacity:0.6;line-height:1.4">Legg portrettfoto i:<br/>/public/ttadv-portrait.jpg</div>
                  </div>
                `;
              }}
            />
          </div>

          {/* Floating name card */}
          <div
            className="floating-card"
            style={{
              position: "absolute",
              bottom: 32,
              left: "2%",
              zIndex: 2,
              background: "#fff",
              borderRadius: 14,
              padding: "14px 20px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              minWidth: 200,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 14, color: "#0A0A0A" }}>
              Tormod Torvanger
            </div>
            <div style={{ fontSize: 11, color: "#1B3A6B", fontWeight: 600, marginTop: 2 }}>
              PhD · Grunnlegger &amp; advokat
            </div>
            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: "1px solid #F0EFED",
                fontSize: 11,
                color: "#888",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Phone size={11} color="#888" />
              +47 90 21 25 08
            </div>
          </div>
        </div>
      </section>

      {/* ── TJENESTER ── */}
      <section
        id="tjenester"
        style={{
          background: "#F2F1EE",
          padding: "100px 5vw",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 64,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <p
                style={{
                  color: "#1B3A6B",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Tjenester
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  margin: 0,
                  color: "#0A0A0A",
                }}
              >
                Hva vi hjelper
                <br />
                <span style={{ color: "#1B3A6B" }}>deg med</span>
              </h2>
            </div>
            <p
              style={{
                maxWidth: 380,
                color: "#666",
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              Alle tjenester er skreddersydd til din situasjon — enten du er i
              startfasen, i vekst, eller midt i en transaksjon.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            <ServiceCard
              number="01"
              title="Skatterett"
              description="Strategisk skatteplanlegging, etterlevelse og tvisteløsning for selskaper og privatpersoner. Vi finner strukturen som gir deg mest optionalitet."
              icon={<Scale size={24} color="#1B3A6B" />}
            />
            <ServiceCard
              number="02"
              title="Selskap &amp; Kontrakter"
              description="Etablering av selskapsstruktur, styrearbeid, aksjonæravtaler og risikofordeling tilpasset dine strategiske mål og vekstplaner."
              icon={<Building2 size={24} color="#1B3A6B" />}
            />
            <ServiceCard
              number="03"
              title="Regulatorisk etterlevelse"
              description="Praktiske rammeverk for å håndtere regulatorisk risiko uten å overbebyrde driften. Riktig compliance fra dag én."
              icon={<FileCheck size={24} color="#1B3A6B" />}
            />
          </div>
        </div>
      </section>

      {/* ── OM ── */}
      <section
        id="om"
        style={{
          padding: "100px 5vw",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Left: Quote card */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "#EEF2FA",
              borderRadius: 20,
              padding: "48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 96,
                color: "#D0DCF0",
                lineHeight: 1,
                fontFamily: "Georgia, serif",
                position: "absolute",
                top: 12,
                left: 28,
                userSelect: "none",
              }}
            >
              "
            </div>
            <p
              style={{
                fontSize: 21,
                fontWeight: 600,
                lineHeight: 1.5,
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
                position: "relative",
                zIndex: 1,
                marginTop: 36,
              }}
            >
              Juridisk rådgivning handler ikke bare om hva loven sier — det
              handler om hva som er{" "}
              <span style={{ color: "#1B3A6B" }}>strategisk riktig for deg.</span>
            </p>
            <div
              style={{
                marginTop: 32,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "#1B3A6B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 800,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                TT
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  Tormod Torvanger
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  PhD · Grunnlegger
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: -20,
              background: "#1B3A6B",
              color: "#fff",
              borderRadius: 12,
              padding: "14px 20px",
              boxShadow: "0 8px 32px rgba(27,58,107,0.3)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>PhD</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Skatteekspert</div>
          </div>
        </div>

        {/* Right: Text */}
        <div>
          <p
            style={{
              color: "#1B3A6B",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Om ttadv
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Teknisk presisjon møter
            <br />
            forretningsforståelse
          </h2>
          <p
            style={{
              color: "#555",
              fontSize: 16,
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            ttadv ble grunnlagt av Tormod Torvanger — en PhD-skatteekspert med
            bred erfaring fra rådgivning av gründere, investorer og
            vekstselskaper. Virksomheten drives gjennom ttadv enk og ttadv as.
          </p>
          <p
            style={{
              color: "#555",
              fontSize: 16,
              lineHeight: 1.75,
              marginBottom: 36,
            }}
          >
            Tormod spesialiserer seg på selskapsstruktur, transaksjoner og
            strategisk risikostyring — alltid med fokus på klarhet,
            forhandlingsposisjon og langsiktig optionalitet for klienten.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <TrustPoint text="Presis, handlingsorientert rådgivning" />
            <TrustPoint text="Dyptgående teknisk og akademisk kompetanse" />
            <TrustPoint text="Forståelse for forretningslogikk og vekstfase" />
          </div>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section
        id="kontakt"
        style={{ background: "#1B3A6B", padding: "100px 5vw", color: "#fff" }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "#6B8DC4",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Ta kontakt
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Klar til å ta neste steg?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              marginBottom: 48,
            }}
          >
            Book en innledende samtale. Vi setter oss inn i din situasjon og
            avklarer raskt om og hvordan vi kan hjelpe deg.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:tt@ttadv.no"
              style={{
                background: "#fff",
                color: "#1B3A6B",
                padding: "15px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Mail size={16} />
              tt@ttadv.no
            </a>
            <a
              href="tel:+4790212508"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "15px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              <Phone size={16} />
              +47 90 21 25 08
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#060A10",
          color: "#555",
          padding: "36px 5vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          tt<span style={{ color: "#6B8DC4" }}>adv</span>
        </div>
        <div style={{ fontSize: 13 }}>
          © 2025 ttadv enk / ttadv as · Alle rettigheter forbeholdt
        </div>
        <div style={{ fontSize: 13 }}>
          <span style={{ color: "#666" }}>Laget av </span>
          <a
            href="https://utvikleren.site"
            style={{ color: "#6B8DC4", textDecoration: "none", fontWeight: 600 }}
          >
            Utvikleren.site AS
          </a>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
          .portrait-container { width: 85% !important; max-width: 380px !important; }
          .floating-card { bottom: -20px !important; left: 5% !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Sub-components ── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        color: "#555",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
    >
      {children}
    </a>
  );
}

function Stat({ number, label, accent }: { number: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: accent ? "#1B3A6B" : "#0A0A0A",
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 2, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

function ServiceCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "36px",
        border: "1px solid #E5E3DF",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "#1B3A6B";
        el.style.boxShadow = "0 8px 32px rgba(27,58,107,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "#E5E3DF";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#EEF2FA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: 12,
            color: "#CCC",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {number}
        </span>
      </div>
      <div>
        <h3
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>
          {description}
        </p>
      </div>
      <div
        style={{
          marginTop: "auto",
          color: "#1B3A6B",
          fontWeight: 600,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        Les mer
        <ArrowUpRight size={13} />
      </div>
    </div>
  );
}

function TrustPoint({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#EEF2FA",
          border: "1.5px solid #C5D5EE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Check size={12} color="#1B3A6B" strokeWidth={2.5} />
      </div>
      <span style={{ fontSize: 15, color: "#444", fontWeight: 500 }}>{text}</span>
    </div>
  );
}
