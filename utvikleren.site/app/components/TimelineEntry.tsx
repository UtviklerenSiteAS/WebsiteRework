"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineEntryProps {
    project: {
        id: string;
        title: string;
        client: string;
        year: string;
        description: string;
        tags: string[];
        image: string;
        link?: string;
    };
    index: number;
}

export default function TimelineEntry({ project, index }: TimelineEntryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-8 md:gap-24 relative"
        >
            {/* Left Column: Meta (Sticky) */}
            <div className="md:w-48 flex-shrink-0 flex flex-col items-start pt-2">
                <div className="md:sticky md:top-32 space-y-1">
                    <div className="text-xl font-bold text-white tracking-tight">
                        {project.client}
                    </div>
                    <div className="text-sm text-white/40 font-mono">
                        {project.year}
                    </div>

                    {/* Mobile-only divider */}
                    <div className="h-px w-12 bg-white/20 my-4 md:hidden" />
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex-1 flex flex-col gap-6 max-w-3xl pb-24 border-b border-white/5 last:border-0 last:pb-0">

                {/* Media Container (Video/Image) */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Center Icon/Play Button Suggestion */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {project.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-lg">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                        <button className="text-sm font-medium text-white hover:text-blue-400 transition-colors flex items-center gap-1">
                            Live Preview
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>
                        <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                            Få tilbud på lignende
                        </button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
