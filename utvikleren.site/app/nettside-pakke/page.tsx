"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, Layout, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function NettsidePage() {
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
                            className="block text-blue-500 font-mono text-sm tracking-widest uppercase mb-6"
                        >
                            Webutvikling
                        </motion.span>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-6xl md:text-9xl font-medium tracking-tighter mb-8 leading-[0.9]"
                        >
                            Designet for <br />
                            konvertering.
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-3xl font-light text-gray-400 max-w-3xl leading-relaxed"
                        >
                            Vi bygger lynraske nettsider som ikke bare ser bra ut, men som faktisk konverterer besøkende til kunder.
                        </motion.p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 border-b border-white/10 pb-20 mb-20">
                        <FeatureBlock
                            icon={Zap}
                            title="Lynrask Ytelse"
                            description="Vi optimaliserer hver linje med kode for å sikre markedets raskeste lastetider. Fordi hvert sekund teller for dine kunder."
                        />
                        <FeatureBlock
                            icon={Layout}
                            title="Unikt Design"
                            description="Ingen ferdige maler. Vi designer nettsiden din fra bunnen av for å matche din merkevare og skille deg ut fra konkurrentene."
                        />
                        <FeatureBlock
                            icon={Globe}
                            title="Mobiloptimalisert"
                            description="Over 60% av all trafikk kommer fra mobil. Nettsidene våre er bygget 'mobile-first' for en sømløs opplevelse på alle enheter."
                        />
                        <FeatureBlock
                            icon={Search}
                            title="SEO Grunnlag"
                            description="Teknisk SEO er innebygd fra start. Vi strukturerer nettsiden slik at Google elsker den, og kundene finner deg."
                        />
                    </div>

                    {/* Value Prop / CTA Area */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-medium tracking-tight mb-4">Trenger du ny nettside?</h2>
                            <p className="text-gray-400 text-lg">
                                Fra enkle landingssider til komplette bedriftsløsninger. Se våre pakker.
                            </p>
                        </div>
                        <Link
                            href="/priser"
                            className="group inline-flex items-center gap-3 text-2xl font-medium border-b border-white pb-1 hover:text-blue-500 hover:border-blue-500 transition-colors"
                        >
                            Se Web-pakker
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
                <Icon size={24} className="text-blue-500" />
            </div>
            <h3 className="text-3xl font-medium tracking-tight mb-4 text-white">{title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">{description}</p>
        </div>
    );
}
