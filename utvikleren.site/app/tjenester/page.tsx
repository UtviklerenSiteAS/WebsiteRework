"use client";

import React from "react";
import { motion } from "framer-motion";
import BlurText from "../components/reactbits/BlurText";
import TiltedCard from "../components/reactbits/TiltedCard";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">

            {/* 1. HERO */}
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative pt-32">
                <div className="max-w-7xl">
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
                        <BlurText
                            text="Vi skalerer"
                            className="block text-white"
                            delay={0.2}
                        />
                        <BlurText
                            text="din visjon."
                            className="block text-white/50"
                            delay={0.6}
                        />
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="flex flex-col md:flex-row gap-12 mt-20 border-t border-white/10 pt-10"
                    >
                        <div className="max-w-lg">
                            <p className="text-xl text-white/80 leading-relaxed font-light">
                                Fra idé til markedsledende produkt. Vi tilbyr en komplett suite av tjenester
                                designet for å gi deg et teknologisk forsprang.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SERVICE: WEBSITE (Visibility & Status) */}
            <section className="py-32 px-6 md:px-20 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-20 max-w-7xl mx-auto">

                    {/* Visual */}
                    <div className="w-full md:w-1/2 order-2 md:order-1">
                        <TiltedCard
                            rotateAmplitude={8}
                            scaleOnHover={1.02}
                            className="w-full aspect-[4/3] relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-sm p-10 flex flex-col justify-between group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-600/20 transition-colors duration-500" />

                                <div className="text-9xl font-bold text-white/5 select-none absolute -bottom-10 -right-10">WEB</div>

                                <div className="space-y-6 relative z-10">
                                    <div className="w-16 h-1 bg-purple-500" />
                                    <div className="text-5xl">💎</div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-white mb-2">Status</h3>
                                    <p className="text-white/60">Et digitalt visittkort som imponerer.</p>
                                </div>
                            </div>
                        </TiltedCard>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-8 order-1 md:order-2">
                        <span className="text-purple-500 font-mono text-sm tracking-wider uppercase">01 — Synlighet</span>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Eksklusive Nettsider</h2>
                        <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                            Din nettside er ofte det første (og siste) inntrykket en kunde får. Vi designer moderne,
                            høyt-ytende nettsider som bygger tillit, oser av kvalitet og posisjonerer deg som en markedsleder.
                        </p>
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> High-End Design & Branding
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Lynrask Ytelse (SEO)
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> 3D & Interaktive Elementer
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* 3. SERVICE: CHATBOT (Automation) */}
            <section className="py-32 px-6 md:px-20 relative z-10 bg-[#080808]">
                <div className="flex flex-col md:flex-row items-center gap-20 max-w-7xl mx-auto">

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <span className="text-blue-500 font-mono text-sm tracking-wider uppercase">02 — Automatisering</span>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">AI Chatbots</h2>
                        <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                            Frigjør tid ved å automatisere dialogen. Våre LLM-baserte chatbots forstår kontekst,
                            svarer på spørsmål basert på dine data, og håndterer kunderelasjoner 24/7 uten pause.
                        </p>
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Trenet på din bedrifts data
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> 24/7 Kundeservice
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Sømløs Integrasjon
                            </li>
                        </ul>
                    </div>

                    {/* Visual */}
                    <div className="w-full md:w-1/2">
                        <TiltedCard
                            rotateAmplitude={8}
                            scaleOnHover={1.02}
                            className="w-full aspect-[4/3] relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-sm p-10 flex flex-col justify-between group">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500" />

                                <div className="text-9xl font-bold text-white/5 select-none absolute -top-10 -left-10">BOT</div>

                                <div className="space-y-6 relative z-10">
                                    <div className="w-16 h-1 bg-blue-500" />
                                    <div className="text-5xl">🤖</div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-white mb-2">Autopilot</h3>
                                    <p className="text-white/60">La AI ta seg av samtalene.</p>
                                </div>
                            </div>
                        </TiltedCard>
                    </div>

                </div>
            </section>

            {/* 4. SERVICE: TAILOR MADE */}
            <section className="py-32 px-6 md:px-20 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-20 max-w-7xl mx-auto">

                    {/* Visual */}
                    <div className="w-full md:w-1/2 order-2 md:order-1">
                        <TiltedCard
                            rotateAmplitude={8}
                            scaleOnHover={1.02}
                            className="w-full aspect-[4/3] relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-sm p-10 flex flex-col justify-between group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-green-600/20 transition-colors duration-500" />

                                <div className="text-9xl font-bold text-white/5 select-none absolute -bottom-10 -right-10">DEV</div>

                                <div className="space-y-6 relative z-10">
                                    <div className="w-16 h-1 bg-green-500" />
                                    <div className="text-5xl">🛠️</div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-white mb-2">Utvikler</h3>
                                    <p className="text-white/60">Vi bygger det du trenger.</p>
                                </div>
                            </div>
                        </TiltedCard>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-8 order-1 md:order-2">
                        <span className="text-green-500 font-mono text-sm tracking-wider uppercase">03 — På Forespørsel</span>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Kun Fantasien Setter Grenser</h2>
                        <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                            Har du en unik idé? Vi utvikler spesialiserte løsninger, dashboards, interne verktøy
                            og komplekse systemer nøyaktig etter dine spesifikasjoner.
                        </p>
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> API-Integrasjoner
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Interne Verktøy
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> SaaS Utvikling
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto space-y-10"
                >
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Klar for en oppgradering?</h2>
                    <p className="text-2xl text-white/50 font-light">Book en uforpliktende prat om ditt prosjekt.</p>
                    <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        Start Prosjekt
                    </button>
                </motion.div>
            </section>

        </main>
    );
}
