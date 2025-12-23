"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Zap, Layers, Cpu } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AppUtviklingPage() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-40 pb-24 px-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1200px] mx-auto relative z-10">

                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b border-white/20 pb-20 mb-20">
                        <div className="space-y-8">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="block text-purple-500 font-mono text-sm tracking-widest uppercase"
                            >
                                Apputvikling
                            </motion.span>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9]"
                            >
                                Fremtidens <br />
                                mobilapper.
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl font-light text-gray-400 max-w-xl leading-relaxed"
                            >
                                Vi utvikler native og cross-platform mobilapplikasjoner som kombinerer kraftig ytelse med et intuitivt design for iOS og Android.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, x: 20 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full" />
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/5">
                                <img
                                    src="/assets/images/app_preview.png"
                                    alt="App development preview"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 border-b border-white/10 pb-20 mb-20">
                        <FeatureBlock
                            icon={Smartphone}
                            title="Cross-platform"
                            description="Vi bruker rammeverk som gjør det mulig å bygge én app som fungerer perfekt på både iOS og Android, noe som sparer deg for både tid og kostnader."
                        />
                        <FeatureBlock
                            icon={Zap}
                            title="Native Ytelse"
                            description="Appene våre er optimalisert for hastighet og respondstid, slik at brukerne dine får en flytende opplevelse som føles naturlig for plattformen."
                        />
                        <FeatureBlock
                            icon={Layers}
                            title="Moderne Grensesnitt"
                            description="Vi fokuserer på moderne UX/UI-prinsipper for å skape apper som er like vakre å se på som de er enkle å bruke."
                        />
                        <FeatureBlock
                            icon={Cpu}
                            title="Avansert Logikk"
                            description="Fra sanntidsdata og push-varsler til AI-integrasjoner – vi bygger appene med den nyeste teknologien for å gi deg et konkurransefortrinn."
                        />
                    </div>

                    {/* Value Prop / CTA Area */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-medium tracking-tight mb-4">Klar for å realisere din app-idè?</h2>
                            <p className="text-gray-400 text-lg">
                                Enten du er en startup eller en etablert bedrift, hjelper vi deg med å bringe din visjon til live i app-store.
                            </p>
                        </div>
                        <Link
                            href="/kontakt"
                            className="group inline-flex items-center gap-3 text-2xl font-medium border-b border-white pb-1 hover:text-purple-500 hover:border-purple-500 transition-colors"
                        >
                            Start Prosjektet
                            <ArrowRight className="transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

function FeatureBlock({ icon: Icon, title, description }: any) {
    return (
        <div>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Icon size={24} className="text-purple-500" />
            </div>
            <h3 className="text-3xl font-medium tracking-tight mb-4 text-white">{title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">{description}</p>
        </div>
    );
}
