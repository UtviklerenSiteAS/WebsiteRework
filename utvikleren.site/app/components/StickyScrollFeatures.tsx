"use client";

import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { Cpu, Layout, Server, Lock, Zap } from "lucide-react";

// Content Data - Aligned with Navbar Services & Focus on Economy
const features = [
    {
        title: "AI Chatbot",
        description: "Reduser lønnskostnader og øk tilgjengeligheten. Vår AI-chatbot håndterer samtaler, bookinger og kundehenvendelser 24/7 uten behov for pauser eller overtidstillegg. Dette frigjør ansatte til å fokusere på verdiskapende arbeid.",
        icon: Cpu,
        color: "blue",
        visual: (
            <div className="relative w-full h-full bg-gray-900 rounded-3xl border border-blue-500/30 overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0.5, scale: 0.9 }}
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1, 0.9] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                            className="w-16 h-16 bg-blue-500/20 rounded-lg border border-blue-500/40"
                        />
                    ))}
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <span className="text-xs font-mono text-blue-300 bg-blue-500/20 px-2 py-1 rounded">SPARER OPTIL 400.000,- / ÅR</span>
                </div>
            </div>
        ),
    },
    {
        title: "Nettside Pakke",
        description: "En nettside er din beste selger. Vi leverer lynraske, konverteringsoptimaliserte nettsider som gjør besøkende om til betalende kunder. Øk omsetningen din med et digitalt utstillingsvindu som jobber for deg døgnet rundt.",
        icon: Layout,
        color: "yellow",
        visual: (
            <div className="relative w-full h-full bg-gray-900 rounded-3xl border border-yellow-500/30 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15),transparent_70%)]" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 border border-dashed border-yellow-500/50 rounded-full flex items-center justify-center"
                >
                    <div className="w-32 h-32 border border-yellow-500/30 rounded-full flex items-center justify-center" >
                        <Zap className="text-yellow-500" size={32} />
                    </div>
                </motion.div>
                <div className="absolute font-mono text-yellow-400 text-lg font-bold bg-black/50 px-3 py-1 rounded border border-yellow-500/30">
                    +45% Konvertering
                </div>
            </div>
        ),
    },
    {
        title: "Systemforvaltning",
        description: "Unngå dyre nedetider og sikkerhetsbrudd. Vi sikrer at dine systemer alltid er oppdaterte, sikre og operative. Ved å forebygge teknisk gjeld unngår du uforutsette kostnader og sikrer stabil drift for din bedrift.",
        icon: Server,
        color: "green",
        visual: (
            <div className="relative w-full h-full bg-gray-900 rounded-3xl border border-green-500/30 overflow-hidden flex items-center justify-center">
                {/* Stacked Cards Effect */}
                <motion.div className="absolute w-64 h-32 bg-gray-800 rounded-lg border border-white/10 shadow-2xl z-0 translate-y-8 scale-90 opacity-60" />
                <motion.div className="absolute w-64 h-32 bg-gray-800 rounded-lg border border-white/10 shadow-2xl z-10 translate-y-4 scale-95 opacity-80" />

                <div className="relative z-20 w-72 h-40 bg-gray-950 rounded-lg border border-green-500/50 shadow-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                            <Lock size={16} />
                        </div>
                        <div>
                            <div className="text-white font-medium text-sm">System Status</div>
                            <div className="text-gray-500 text-xs">Driftoptimalisert</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-xs text-green-400 font-mono">100% OPPE</span>
                    </div>
                </div>
            </div>
        ),
    },
];

export default function StickyScrollFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeCard, setActiveCard] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Simple logic to snap actve card based on scroll progress of the container
        const step = 1 / features.length;
        const index = Math.min(Math.floor(latest / step), features.length - 1);
        setActiveCard(index);
    });

    return (
        <div ref={containerRef} className="relative w-full bg-black">
            {/* Spacer to allow scrolling */}
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">

                {/* LEFT: Scrolling Text Content */}
                <div className="py-24 px-6 md:px-12 space-y-48">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0.2 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ margin: "-40% 0px -40% 0px" }}
                            className="flex gap-6 min-h-[60vh] transition-opacity duration-500"
                        >
                            {/* Connection Line & Icon */}
                            <div className="flex flex-col items-center gap-4 pt-2 relative">
                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-500 ${activeCard === index ? `bg-${feature.color}-500/10 border-${feature.color}-500 text-${feature.color}-500` : 'bg-gray-900 border-white/10 text-gray-600'}`}>
                                    <feature.icon size={24} />
                                </div>
                                {/* Vertical Line Segment */}
                                {index !== features.length - 1 && (
                                    <div className="w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent absolute top-14 left-6 -translate-x-1/2" />
                                )}
                            </div>

                            <div className="pt-2">
                                <h3 className={`text-3xl md:text-4xl font-medium tracking-tight mb-4 transition-colors duration-500 ${activeCard === index ? 'text-white' : 'text-gray-600'}`}>
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* RIGHT: Sticky Visual */}
                <div className="h-screen sticky top-2 hidden lg:flex items-center justify-center px-6 md:px-12">
                    <div className="w-full max-w-[500px] h-[350px] relative">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0,
                                    scale: activeCard === index ? 1 : 0.95,
                                    filter: activeCard === index ? "blur(0px)" : "blur(10px)",
                                    zIndex: activeCard === index ? 10 : 0
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                {feature.visual}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
