"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Database, Server, Zap, CheckCircle } from "lucide-react";

// --- REUSABLE BEAM COMPONENT ---
// Draws a line between two refs and animates a "packet" traveling along it
function AnimatedBeam({
    fromRef,
    toRef,
    containerRef,
    curvature = 0,
    reverse = false,
    duration = 2,
    delay = 0,
    color = "#60a5fa", // blue-400
}: {
    fromRef: React.RefObject<HTMLDivElement>;
    toRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    curvature?: number;
    reverse?: boolean;
    duration?: number;
    delay?: number;
    color?: string;
}) {
    const [path, setPath] = useState("");
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    // Calculate SVG Path dynamically based on positions
    useEffect(() => {
        const updatePath = () => {
            if (!fromRef.current || !toRef.current || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const fromRect = fromRef.current.getBoundingClientRect();
            const toRect = toRef.current.getBoundingClientRect();

            // Relative coordinates inside the SVG container
            const startX = fromRect.left - containerRect.left + fromRect.width / 2;
            const startY = fromRect.top - containerRect.top + fromRect.height / 2;
            const endX = toRect.left - containerRect.left + toRect.width / 2;
            const endY = toRect.top - containerRect.top + toRect.height / 2;

            // Control points for bezier curve
            const controlX = (startX + endX) / 2;
            const controlY = (startY + endY) / 2 + curvature;

            setPath(`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`);
            setSvgDimensions({ width: containerRect.width, height: containerRect.height });
        };

        updatePath();
        window.addEventListener("resize", updatePath);
        return () => window.removeEventListener("resize", updatePath);
    }, [fromRef, toRef, containerRef, curvature]);

    return (
        <svg
            fill="none"
            width={svgDimensions.width}
            height={svgDimensions.height}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 pointer-events-none z-0"
        >
            {/* Background Track */}
            <path d={path} stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" />

            {/* Animated Beam */}
            <motion.path
                d={path}
                stroke={`url(#gradient-${fromRef === toRef ? "unique" : Math.random()})`} // Simple unique ID hack or use distinct ID
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: [0, 0.4, 0], // Grow then Shrink to simulate a moving "comet"
                    opacity: [0, 1, 0],
                    pathOffset: [0, 1, 1], // Move along the path
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                    repeatDelay: 0.5
                }}
                strokeDasharray="0 1" // Important for pathLength to work as percentage
            />

            <defs>
                <linearGradient id={`gradient-${fromRef === toRef ? "unique" : Math.random()}`} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={color} stopOpacity="0" />
                    <stop offset="100%" stopColor={color} stopOpacity="1" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// --- MAIN DIAGRAM COMPONENT ---
export default function ProcessDiagram() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const aiRef = useRef<HTMLDivElement>(null);
    const dbRef = useRef<HTMLDivElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full py-24 px-6 bg-black relative" ref={containerRef}>
            <div className="max-w-5xl mx-auto relative flex justify-between items-center h-[400px]">

                {/* Animated Beams Layer */}
                {/* We render beams *inside* the container, but they position absolutely */}
                {/* Beam 1: Input -> AI */}
                <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={aiRef} curvature={-50} duration={3} />
                <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={aiRef} curvature={50} duration={3} delay={1.5} color="#a855f7" />

                {/* Beam 2: AI -> DB (Bi-directional) */}
                <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={dbRef} duration={2} delay={0.5} />
                <AnimatedBeam containerRef={containerRef} fromRef={dbRef} toRef={aiRef} duration={2} delay={1.5} reverse color="#10b981" />

                {/* Beam 3: AI -> Output */}
                <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={outputRef} curvature={0} duration={2} delay={1} />


                {/* NODES */}

                {/* Node 1: Input Source */}
                <div ref={inputRef} className="z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center p-4">
                        <Server className="w-full h-full text-white" />
                    </div>
                    <span className="text-sm font-mono text-gray-500">Data Source</span>
                </div>

                {/* Node 2: AI Processing (Center) */}
                <div ref={aiRef} className="z-10 flex flex-col items-center gap-4 relative">
                    <div className="w-24 h-24 rounded-full bg-black border border-blue-500/50 flex items-center justify-center p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                        <Brain className="w-full h-full text-blue-400" />
                    </div>
                    <div className="absolute -inset-4 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    <span className="text-sm font-mono text-blue-400">AI Core</span>
                </div>

                {/* Node 3: Database (Bottom/Side) - Actually positioned absolutely to create triangle layout if needed, or flex */}
                {/* For this Flex layout, let's put it in the flow but offset vertically? No, flex row is simpler. */}
                <div ref={dbRef} className="z-10 flex flex-col items-center gap-4 mt-32">
                    <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center p-4">
                        <Database className="w-full h-full text-green-400" />
                    </div>
                    <span className="text-sm font-mono text-gray-500">Vector DB</span>
                </div>

                {/* Node 4: Output */}
                <div ref={outputRef} className="z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white text-black border border-white flex items-center justify-center p-4 shadow-lg shadow-white/20">
                        <CheckCircle className="w-full h-full" />
                    </div>
                    <span className="text-sm font-mono text-white">Action</span>
                </div>

            </div>

            {/* Caption */}
            <div className="text-center mt-12">
                <h3 className="text-2xl font-medium text-white mb-2">Autonomous Execution Flow</h3>
                <p className="text-gray-500">Data inputs are analyzed, verified against context, and executed instantly.</p>
            </div>
        </div>
    );
}
