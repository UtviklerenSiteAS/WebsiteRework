"use client";

import { motion } from "framer-motion";
import { Database, Server, Brain, Code, Binary, Network, Cloud, Lock } from "lucide-react";

export default function OrbitingDataAnimation() {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-white/5 rounded-3xl">
            {/* Core / Center */}
            <div className="absolute z-20 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                <Brain size={48} className="text-white" />
            </div>

            {/* Inner Orbit Ring */}
            <div className="absolute z-10 w-[200px] h-[200px] border border-dashed border-gray-200 rounded-full opacity-60"></div>

            {/* Inner Orbiting Elements Container */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute z-10 w-[200px] h-[200px]"
            >
                {/* Elements positioned on the ring */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-500">
                    <Code size={20} />
                </div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-purple-500">
                    <Binary size={20} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-cyan-500">
                    <Lock size={20} />
                </div>
            </motion.div>

            {/* Outer Orbit Ring */}
            <div className="absolute z-0 w-[350px] h-[350px] border border-dashed border-gray-200 rounded-full opacity-40"></div>

            {/* Outer Orbiting Elements Container (Reverse Rotation) */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute z-0 w-[350px] h-[350px]"
            >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-50 border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-600">
                    <Database size={24} />
                </div>
                <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-12 h-12 bg-gray-50 border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-indigo-600">
                    <Server size={24} />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-50 border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-green-600">
                    <Network size={24} />
                </div>
                <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-12 h-12 bg-gray-50 border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-orange-500">
                    <Cloud size={24} />
                </div>
            </motion.div>

            {/* Floating Particles Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Can add random particles here if needed */}
            </div>

        </div>
    );
}
