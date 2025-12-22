"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    subItems?: string[];
}

export default function ServiceCard({ title, description, icon: Icon, subItems }: ServiceCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative flex flex-col p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden group h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-8 h-8 text-white group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{description}</p>
                {subItems && subItems.length > 0 && (
                    <ul className="space-y-2 mt-auto">
                        {subItems.map((item, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
}
