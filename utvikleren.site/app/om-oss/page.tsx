"use client";

import React from "react";
import { motion } from "framer-motion";
import BlurText from "../components/reactbits/BlurText";
import TiltedCard from "../components/reactbits/TiltedCard";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">

            {/* 1. HERO - Cinematic Entrance */}
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative pt-32">
                <div className="max-w-7xl">
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
                        <BlurText
                            text="Vi definerer"
                            className="block text-white"
                            delay={0.2}
                        />
                        <BlurText
                            text="det digitale."
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
                                Vi moderniserer din bedrift med kunstig intelligens. Mens andre tilpasser seg nåtiden,
                                bygger vi infrastrukturen som holder deg tre steg foran konkurrentene.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Background ambient light */}
                <div className="hidden md:block absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
            </section>

            {/* 2. THE VISION - Asymmetric / 3D Layout */}
            <section className="py-32 px-6 md:px-20 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-20 max-w-7xl mx-auto">

                    {/* Visual - Tilted Card */}
                    <div className="w-full md:w-1/2">
                        <TiltedCard
                            rotateAmplitude={10}
                            scaleOnHover={1.02}
                            className="w-full aspect-[4/5] md:aspect-square relative"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center border border-white/10 rounded-sm p-8 flex flex-col justify-between shadow-2xl"
                                style={{
                                    backgroundImage: "url('/images/ai-card-bg.png')",
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                    backgroundBlendMode: "overlay"
                                }}
                            >
                                <div className="text-8xl font-bold text-white/10 select-none">AI</div>
                                <div className="space-y-4 relative z-10">
                                    <div className="w-12 h-1 bg-blue-500" />
                                    <h3 className="text-3xl font-bold text-white">Alltid foran.</h3>
                                    <p className="text-white/80">Vi implementerer morgendagens teknologi i dag, slik at din bedrift leder an.</p>
                                </div>
                            </div>
                        </TiltedCard>
                    </div>

                    {/* Text Content */}
                    <div className="w-full md:w-1/2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold mb-8">AI-Drevet.</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Automatisering", desc: "Vi erstatter manuelt arbeid med intelligente agenter som jobber 24/7." },
                                    { title: "Prediksjon", desc: "Utnytt dataene dine til å se muligheter før konkurrentene gjør det." },
                                    { title: "Skalerbarhet", desc: "Systemer som vokser og lærer med bedriften din, uten begrensninger." }
                                ].map((item, i) => (
                                    <div key={i} className="group border-l border-white/10 pl-6 hover:border-blue-500 transition-colors duration-300 py-2">
                                        <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                        <p className="text-white/50 mt-2">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* 3. TEAM - Minimalist Cards */}
            <section className="py-40 px-6 md:px-20 bg-[#080808]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Teamet</h2>
                    </div>

                    <div className="flex justify-center">
                        <TiltedCard
                            className="w-full max-w-3xl"
                            rotateAmplitude={5}
                            scaleOnHover={1.01}
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 group">

                                {/* Background Gradient Effect */}
                                <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500" />

                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-1 shadow-2xl shadow-blue-900/20 group-hover:scale-105 transition-transform duration-500">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl md:text-5xl font-bold text-white relative overflow-hidden">
                                            {/* Shine effect on avatar */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            EE
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center md:text-left space-y-4 relative z-10 font-sans">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Elias Aarflot Elvsaas</h3>
                                        <p className="text-blue-400 font-mono text-sm tracking-wider uppercase mt-2">Lead Developer & Founder</p>
                                    </div>

                                    <div className="w-12 h-0.5 bg-white/10 mx-auto md:mx-0 my-6" />

                                    <p className="text-xl text-white/70 italic font-light leading-relaxed max-w-lg">
                                        "Fremtiden tilhører de som automatiserer."
                                    </p>
                                </div>

                            </div>
                        </TiltedCard>
                    </div>
                </div>
            </section>

        </main>
    );
}
