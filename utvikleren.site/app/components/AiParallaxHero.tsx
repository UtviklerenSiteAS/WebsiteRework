"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Database, Network } from "lucide-react";
import AiPlasmaAnimation from "./AiPlasmaAnimation";

export default function AiParallaxHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [textState, setTextState] = useState("AI POWER");

    // We track the scroll progress of the container relative to the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"], // Track from start of container to when the container LEAVES the viewport
    });

    // Text Switch Logic
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.4 && textState === "AI POWER") {
            setTextState("UNLEASHED");
        } else if (latest <= 0.4 && textState === "UNLEASHED") {
            setTextState("AI POWER");
        }
    });

    // Parallax & Exit Transforms
    // 0 to 0.8: Active Animation
    // 0.8 to 1.0: Fade Out / Move Up (Exit)

    // Background moves slightly for depth
    const yBackground = useTransform(scrollYProgress, [0, 0.8], ["0%", "20%"]);

    // Clouds Move Up
    const yCloud1 = useTransform(scrollYProgress, [0, 0.8], [0, -600]);
    const yCloud2 = useTransform(scrollYProgress, [0, 0.8], [0, -1000]);

    // Wiper Action (0 to 0.8)
    const yWiper = useTransform(scrollYProgress, [0, 0.8], ["100vh", "-100vh"]);
    const scaleWiper = useTransform(scrollYProgress, [0.3, 0.5], [1, 2.5]);

    // Exit Animation (0.85 to 1.0) - Simulates the 'fixed' element scrolling away
    // We move the entire fixed container UP as if it were sticky and being pushed
    const yExit = useTransform(scrollYProgress, [0.85, 1], ["0%", "-100%"]);
    const opacityExit = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[250vh] w-full">
            {/* 
                FIXED CONTAINER 
                Using position: fixed to mimic CodePen behavior exactly.
                It stays pinned to the viewport.
                We use yExit to manually "scroll it away" when the spacer ends.
            */}
            <motion.div
                style={{ y: yExit, opacity: opacityExit }}
                className="fixed inset-0 h-screen w-full bg-gray-950 overflow-hidden flex items-center justify-center z-0"
            >

                {/* 1. LAYER: Full Screen Background (Plasma) */}
                <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 opacity-80">
                    <AiPlasmaAnimation />
                </motion.div>

                {/* 2. LAYER: Mid-ground Elements (Icons) */}
                <motion.div style={{ y: yCloud1 }} className="absolute top-[60%] left-[10%] z-10 opacity-60">
                    <div className="p-4 bg-blue-500/10 backdrop-blur-md rounded-2xl border border-blue-500/30">
                        <Database size={64} className="text-blue-400" />
                    </div>
                </motion.div>

                <motion.div style={{ y: yCloud2 }} className="absolute top-[70%] right-[15%] z-10 opacity-70">
                    <div className="p-6 bg-purple-500/10 backdrop-blur-md rounded-full border border-purple-500/30">
                        <Brain size={80} className="text-purple-400" />
                    </div>
                </motion.div>

                {/* 3. LAYER: The Main Text (Fixed in center) */}
                <div className="relative z-20 mix-blend-overlay">
                    <h1 className="text-7xl md:text-[12rem] font-sans font-black tracking-tighter text-white text-center leading-none">
                        {textState}
                    </h1>
                </div>

                {/* 4. LAYER: Foreground "Wiper" Cloud/Blocker */}
                <motion.div
                    style={{ y: yWiper, scale: scaleWiper }}
                    className="absolute top-0 left-0 right-0 h-screen z-30 pointer-events-none flex items-center justify-center"
                >
                    <div className="w-[120vw] h-[80vh] bg-gradient-to-t from-transparent via-cyan-900/90 to-transparent blur-[80px] rounded-[50%]" />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 text-gray-400"
                >
                    <span className="text-sm uppercase tracking-widest">Scroll to Transform</span>
                </motion.div>

            </motion.div>
        </div>
    );
}
