"use client";

import { motion } from "framer-motion";
import { ArrowRight, Server, Shield, Activity, Lock } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function SystemforvaltningPage() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-[1200px] mx-auto">

                    {/* Hero Section */}
                    <div className="border-b border-white/20 pb-20 mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="block text-green-500 font-mono text-sm tracking-widest uppercase mb-6"
                        >
                            Drift & Sikkerhet
                        </motion.span>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-6xl md:text-9xl font-medium tracking-tighter mb-8 leading-[0.9]"
                        >
                            Sikkerhet i <br />
                            førersetet.
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-3xl font-light text-gray-400 max-w-3xl leading-relaxed"
                        >
                            Vi tar ansvar for driften, slik at du kan fokusere på kjernevirksomheten. Sikkerhetsoppdateringer, backup og overvåkning 24/7.
                        </motion.p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 border-b border-white/10 pb-20 mb-20">
                        <FeatureBlock
                            icon={Shield}
                            title="Total Sikkerhet"
                            description="Vi implementerer enterprise-grade sikkerhet med brannmurer, DDoS-beskyttelse og jevnlige sikkerhetsrevisjoner av systemene dine."
                        />
                        <FeatureBlock
                            icon={Server}
                            title="Skalerbar Infrastruktur"
                            description="Vokser bedriften? Ikke noe problem. Våre løsninger skalerer automatisk med trafikken din, uten nedetid."
                        />
                        <FeatureBlock
                            icon={Activity}
                            title="24/7 Overvåkning"
                            description="Vi overvåker systemene dine døgnet rundt. Hvis noe går galt, vet vi det før du gjør det – og fikser det umiddelbart."
                        />
                        <FeatureBlock
                            icon={Lock}
                            title="Daglig Backup"
                            description="Dine data er trygge hos oss. Vi kjører automatisk backup hver dag til eksterne servere for å sikre mot datatap."
                        />
                    </div>

                    {/* Value Prop / CTA Area */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-medium tracking-tight mb-4">Sikre din digitale fremtid.</h2>
                            <p className="text-gray-400 text-lg">
                                Forutsigbar drift til fast månedspris. Ingen overraskelser.
                            </p>
                        </div>
                        <Link
                            href="/priser"
                            className="group inline-flex items-center gap-3 text-2xl font-medium border-b border-white pb-1 hover:text-green-500 hover:border-green-500 transition-colors"
                        >
                            Se Driftsavtaler
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
                <Icon size={24} className="text-green-500" />
            </div>
            <h3 className="text-3xl font-medium tracking-tight mb-4 text-white">{title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">{description}</p>
        </div>
    );
}
