"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Video,
    Sparkles,
    ArrowRight,
    ArrowLeft,
    Type,
    Target,
    Wand2,
    CheckCircle2,
    MonitorPlay,
    Clapperboard,
    Shapes
} from "lucide-react";

type AdType = "ugc" | "cinematic" | "product" | "social";

export default function AIReklameDashboard() {
    const [step, setStep] = useState(1);
    const [adType, setAdType] = useState<AdType | null>(null);
    const [formData, setFormData] = useState({
        productName: "",
        productDesc: "",
        objective: "",
        tone: "Modern & Energetic"
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, title: "Type Reklame", icon: <Clapperboard size={20} /> },
        { id: 2, title: "Produkt Info", icon: <Type size={20} /> },
        { id: 3, title: "Mål & Tone", icon: <Target size={20} /> },
        { id: 4, title: "Generer", icon: <Wand2 size={20} /> },
    ];

    return (
        <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black p-6 md:p-12">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">AI Reklame-studio</h1>
                        <p className="text-gray-400">Lag profesjonelle annonser på minutter med AI.</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                        {steps.map((s) => (
                            <div key={s.id} className="flex items-center gap-2">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                    ${step >= s.id ? 'bg-white text-black ring-4 ring-white/10' : 'bg-white/5 text-gray-500 border border-white/10'}
                                `}>
                                    {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
                                </div>
                                {s.id !== 4 && (
                                    <div className={`w-8 h-[2px] rounded-full ${step > s.id ? 'bg-white' : 'bg-white/10'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 min-h-[500px] flex flex-col relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 flex-1"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-medium tracking-tight">Hva slags reklame ønsker du å lage?</h2>
                                    <p className="text-gray-400 text-lg">Velg formatet som passer ditt mål best.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SelectionCard
                                        id="ugc"
                                        selected={adType === "ugc"}
                                        onClick={() => setAdType("ugc")}
                                        icon={<Shapes />}
                                        title="UGC-stil"
                                        desc="Autentisk, 'brukerskapt' innhold perfekt for TikTok og Reels."
                                    />
                                    <SelectionCard
                                        id="cinematic"
                                        selected={adType === "cinematic"}
                                        onClick={() => setAdType("cinematic")}
                                        icon={<MonitorPlay />}
                                        title="Kinematisk"
                                        desc="Høyproduksjons-følelse med episke bilder og profesjonell redigering."
                                    />
                                    <SelectionCard
                                        id="product"
                                        selected={adType === "product"}
                                        onClick={() => setAdType("product")}
                                        icon={<Video />}
                                        title="Produktfokus"
                                        desc="Fokus på detaljer, funksjoner og brukervennlighet."
                                    />
                                    <SelectionCard
                                        id="social"
                                        selected={adType === "social"}
                                        onClick={() => setAdType("social")}
                                        icon={<Sparkles />}
                                        title="Kampanje"
                                        desc="Kort, konsist og optimalisert for raske konverteringer."
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 flex-1"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-medium tracking-tight">Beskriv ditt produkt</h2>
                                    <p className="text-gray-400 text-lg">Gi AI-en nok informasjon til å skape et fantastisk manus.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Produkt / Navn</label>
                                        <input
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors"
                                            placeholder="Eks: UltraGrip Joggesko"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Hva gjør produktet unikt?</label>
                                        <textarea
                                            rows={4}
                                            value={formData.productDesc}
                                            onChange={(e) => setFormData({ ...formData, productDesc: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors resize-none"
                                            placeholder="Fortell oss om fordelene..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 flex-1"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-medium tracking-tight">Mål og Tone</h2>
                                    <p className="text-gray-400 text-lg">Finjuster hvordan annonsen skal føles.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Hva er målet?</label>
                                        <select
                                            value={formData.objective}
                                            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-black">Velg mål...</option>
                                            <option value="sales" className="bg-black">Salg</option>
                                            <option value="awareness" className="bg-black">Merkevarebygging</option>
                                            <option value="leads" className="bg-black">Lead-generering</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Ønsket tone</label>
                                        <input
                                            value={formData.tone}
                                            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors"
                                            placeholder="Eks: Profesjonell, humoristisk, minimalistisk..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center space-y-8 flex-1"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                    <Wand2 size={40} className="text-white" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-bold tracking-tight">Klar til å generere?</h2>
                                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                                        Vår AI er klar til å analysere dine data og skape den perfekte {adType}-annonsen for {formData.productName}.
                                    </p>
                                </div>

                                <button className="group px-12 py-5 bg-white text-black font-bold text-xl rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-4 hover:scale-105">
                                    START GENERERING
                                    <Sparkles size={24} className="text-purple-600 animate-bounce" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Nav */}
                    <div className="mt-auto pt-12 flex justify-between border-t border-white/10">
                        {step > 1 && step < 4 && (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium px-6 py-3 rounded-xl hover:bg-white/5"
                            >
                                <ArrowLeft size={20} />
                                Tilbake
                            </button>
                        )}
                        <div className="ml-auto flex gap-4">
                            {step < 4 && (
                                <button
                                    onClick={nextStep}
                                    disabled={step === 1 && !adType}
                                    className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    Neste
                                    <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function SelectionCard({ id, selected, onClick, icon, title, desc }: any) {
    return (
        <button
            onClick={onClick}
            className={`
                group p-6 rounded-2xl border transition-all text-left relative overflow-hidden
                ${selected
                    ? 'bg-white/10 border-white ring-2 ring-white/20'
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]'}
            `}
        >
            <div className={`mb-4 transition-colors ${selected ? 'text-white' : 'text-gray-500 group-hover:text-gray-400'}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>

            {selected && (
                <div className="absolute top-4 right-4 text-white">
                    <CheckCircle2 size={18} />
                </div>
            )}
        </button>
    );
}
