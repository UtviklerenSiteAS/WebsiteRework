"use client";

import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import ContactForm from "../components/ContactForm";
import BlurText from "../components/reactbits/BlurText";

export default function ContactPage() {
    return (
        <main className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased selection:bg-purple-500/30">

            {/* Split Layout Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-12 lg:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-20 pt-32 md:pt-0">

                {/* LEFT SIDE: Copy & Vision */}
                <div className="w-full md:w-1/2 space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 tracking-tight leading-[1.1]">
                        <BlurText
                            text="Start reisen."
                            className="text-white drop-shadow-2xl"
                            delay={0.2}
                        />
                    </h1>

                    <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                        Vi skaper morgendagens løsninger i dag. Fortell oss om dine ambisjoner, så bygger vi fremtiden sammen.
                    </p>

                    <div className="pt-8 flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-neutral-500 text-sm font-mono uppercase tracking-wider">
                            <span>Kontakt Oss Direkte</span>
                            <div className="h-px bg-neutral-800 flex-1" />
                        </div>
                        <a
                            href="mailto:post@utvikleren.site"
                            className="text-2xl text-white hover:text-purple-400 transition-colors font-medium"
                        >
                            post@utvikleren.site
                        </a>
                    </div>
                </div>

                {/* RIGHT SIDE: The Form */}
                <div className="w-full md:w-1/2 relative">
                    {/* Decorative gradient behind form */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <ContactForm />
                </div>
            </div>

            {/* Background Beams */}
            <BackgroundBeams />
        </main>
    );
}
