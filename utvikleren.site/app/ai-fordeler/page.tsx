"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import Counter from "../components/Counter";
import ProcessDiagram from "../components/ProcessDiagram";
import StickyScrollFeatures from "../components/StickyScrollFeatures";
import Navbar from "../components/Navbar";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function AiBenefitsPage() {
    const ctaRef = useRef(null);
    const isCtaInView = useInView(ctaRef, { amount: 0.5 }); // Trigger when 50% of CTA is visible

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <motion.div
                animate={{ y: isCtaInView ? -100 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 pointer-events-none" // pointer-events-none to let clicks pass through wrapper, but Navbar should have pointer-events-auto
            >
                <div className="pointer-events-auto">
                    <Navbar />
                </div>
            </motion.div>

            {/* SECTION 1: SYSTEM OVERVIEW (Header) */}
            <section className="relative w-full px-6 pt-32 pb-24 md:pt-40 md:pb-32 border-b border-white/10">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                    >
                        {/* Title Block */}
                        <div className="lg:col-span-8 space-y-8">


                            <h1 className="text-7xl md:text-9xl font-medium tracking-tighter text-white leading-[0.85] -ml-1">
                                Oversikt over <br /> tjenester
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed pt-4 font-light">
                                Vi integrerer intelligens direkte i din infrastruktur.
                                <span className="text-white font-medium"> Ingen unødvendig støy. Ren effektivitet.</span>
                            </p>
                        </div>

                        {/* 3D Logo Display */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center">
                            <motion.div
                                variants={fadeInUp}
                                className="relative w-full max-w-md aspect-square flex items-center justify-center"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/assets/images/3Dlogo.png"
                                        alt="Utvikleren.site 3D Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* SECTION 3: CORE MODULES (Sticky Scroll) */}
            <section className="w-full bg-black border-b border-white/10">
                <StickyScrollFeatures />
            </section>

            {/* SECTION 4: FINANCIAL DASHBOARD */}
            <section className="py-24 w-full px-6 bg-gray-950 border-t border-white/10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-20 items-center">

                        {/* Dashboard Window */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-black border border-white/10 shadow-2xl relative rounded-3xl overflow-hidden"
                        >
                            {/* Header Bar */}
                            <div className="bg-gray-900/50 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500/80 rounded-full" />
                                    <div className="w-3 h-3 bg-yellow-500/80 rounded-full" />
                                    <div className="w-3 h-3 bg-green-500/80 rounded-full" />
                                </div>
                                <span className="text-xs font-mono text-gray-500">økonomiske_prognoser_2025.pdf</span>
                            </div>

                            {/* Chart Area */}
                            <div className="p-12 min-h-[450px] flex items-end justify-center gap-20 bg-[url('/grid-pattern.svg')]">
                                {/* Bar Group 1 */}
                                <div className="flex flex-col items-center gap-4 group">
                                    <div className="px-3 py-1 bg-white/10 rounded text-xs font-mono text-red-300 opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                                        <Counter value={40} prefix="-" suffix="%" />
                                    </div>
                                    <motion.div
                                        initial={{ height: 20 }}
                                        whileInView={{ height: 160 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, type: "spring", bounce: 0 }}
                                        className="w-20 bg-red-500/20 border border-red-500/50 relative backdrop-blur-sm"
                                    >
                                        <div className="absolute top-0 w-full h-[1px] bg-red-500/50" />
                                        <div className="absolute bottom-0 w-full h-[1px] bg-red-500/50" />
                                    </motion.div>
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest pt-2">OpEx</span>
                                </div>

                                {/* Bar Group 2 */}
                                <div className="flex flex-col items-center gap-4 group">
                                    <div className="px-3 py-1 bg-white/10 rounded text-xs font-mono text-green-300 opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                                        <Counter value={65} prefix="+" suffix="%" />
                                    </div>
                                    <motion.div
                                        initial={{ height: 20 }}
                                        whileInView={{ height: 320 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, type: "spring", bounce: 0, delay: 0.2 }}
                                        className="w-20 bg-green-500/20 border border-green-500/50 relative backdrop-blur-sm"
                                    >
                                        <div className="absolute top-0 w-full h-[1px] bg-green-500/50" />
                                        <div className="absolute bottom-0 w-full h-[1px] bg-green-500/50" />
                                    </motion.div>
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest pt-2">Margin</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="space-y-10">
                            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white">
                                Påvirkning. <br />
                                <span className="text-gray-500">Målbar.</span>
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-md font-light">
                                Overflatereduksjon skjer umiddelbart. Effektivitetsgevinster skalerer eksponentielt over tid. Vi leverer et datadrevet dashbord som dokumenterer og verifiserer verdiskapningen.
                            </p>

                            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <div className="text-5xl font-mono text-white mb-1 tracking-tighter">
                                        <Counter value={40} prefix="-" suffix="%" />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Uforventet kostnadder</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-mono text-green-500 mb-1 tracking-tighter">
                                        <Counter value={65} prefix="+" suffix="%" />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Effektivitets gevinster</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: CTA */}
            <section ref={ctaRef} className="max-h-[100vh] py-40 w-full px-6 bg-white text-black text-center relative z-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-6xl md:text-8xl font-medium tracking-tighter">
                        Klar for å skape noe fantastisk sammen?
                    </h2>
                    <div className="pt-8">
                        <Link
                            href="/#contact"
                            className="inline-block px-16 py-6 bg-black text-white text-xl font-medium rounded-full hover:scale-105 transition-transform"
                        >
                            Sett i gang
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
