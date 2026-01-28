"use client";

import React from "react";
import Beams from "./components/Beams";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function Home() {
  return (
    <main className="relative bg-[#030303] text-white selection:bg-purple-500/30 h-[100dvh] w-full overflow-hidden">

      {/* Hero Section - Full Screen Only */}
      <section className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Beams Background */}
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={6}
            beamHeight={15}
            beamNumber={20}
            beamSpacing={3}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={35}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight max-w-3xl mx-auto drop-shadow-2xl">
                <div className="flex flex-col items-center">
                  <div className="relative h-[1.1em] flex items-center justify-center">
                    <span className="block md:hidden text-white">Fremtidssikret</span>
                    <div className="hidden md:block">
                      <GooeyText
                        texts={["Intelligent", "Automatisert", "Innovativ", "Fremtidssikret"]}
                        morphTime={1}
                        cooldownTime={0.25}
                        textClassName="text-white"
                      />
                    </div>
                  </div>
                  <span className="text-white mt-6">Med AI.</span>
                </div>
              </h1>
            </div>

            <p className="text-lg lg:text-xl text-white/70 max-w-xl font-light leading-relaxed mx-auto">
              Hold deg i front. Vi integrerer banebrytende AI i alle lag av din virksomhet
              for å sikre at du overgår dagens trender og standarder.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-6">
              <button className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300 group flex items-center justify-center gap-2">
                Transformer nå
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300">
                Utforsk AI-løsninger
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
