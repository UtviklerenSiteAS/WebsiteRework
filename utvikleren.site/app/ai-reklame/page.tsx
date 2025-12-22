"use client";

import { motion } from "framer-motion";
import { ArrowRight, Video, Zap, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AIReklamePage() {
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
                            className="block text-purple-500 font-mono text-sm tracking-widest uppercase mb-6"
                        >
                            AI Video Reklame
                        </motion.span>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-6xl md:text-9xl font-medium tracking-tighter mb-8 leading-[0.9]"
                        >
                            Reklame som <br />
                            konverterer.
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-3xl font-light text-gray-400 max-w-3xl leading-relaxed"
                        >
                            Vi kombinerer avansert AI med markedsførings-psykologi for å skape videoannonser som fanger oppmerksomhet og driver salg.
                        </motion.p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 border-b border-white/10 pb-20 mb-20">
                        <FeatureBlock
                            icon={Video}
                            title="AI-generert Video"
                            description="Fra profesjonelle manus til ferdig redigert video på rekordtid. Vi bruker de nyeste AI-modellene for å skape visuelt slående innhold."
                        />
                        <FeatureBlock
                            icon={Target}
                            title="Målrettet Budskap"
                            description="Annonsene våre er bygget på data. Vi skreddersyr manuset og det visuelle for å treffe akkurat din målgruppe der de er."
                        />
                        <FeatureBlock
                            icon={Zap}
                            title="Lynrask Levering"
                            description="Tradisjonell videoproduksjon tar uker. Med vår AI-arbeidsflyt leverer vi ferdige annonser på dager, ikke uker."
                        />
                        <FeatureBlock
                            icon={Sparkles}
                            title="Høy Konvertering"
                            description="Hvert bilde og hvert ord er optimalisert for konvertering. Vi skaper innhold som ikke bare ser bra ut, men som faktisk selger."
                        />
                    </div>

                    {/* Value Prop / CTA Area */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-medium tracking-tight mb-4">Klar for å dominere sosiale medier?</h2>
                            <p className="text-gray-400 text-lg">
                                Enten du trenger UGC-stilt innhold eller kinematiske produktvideoer – vi har løsningen.
                            </p>
                        </div>
                        <Link
                            href="/priser"
                            className="group inline-flex items-center gap-3 text-2xl font-medium border-b border-white pb-1 hover:text-purple-500 hover:border-purple-500 transition-colors"
                        >
                            Se Pakkepriser
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
