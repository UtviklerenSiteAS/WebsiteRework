"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ChangelogProject {
    id: string;
    logo?: string;
    title: string;
    client: string;
    category: string;
    year?: string;
    description?: string;
    tags?: string[];
    status: string; // Simplified, effectively "Planlegging" | "Under arbeid" | "Ferdig"
    avatars: string[];
    link?: string;
}

interface ChangelogItemProps {
    project: ChangelogProject;
}

export default function ChangelogItem({ project }: ChangelogItemProps) {

    return (
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 py-8 group">
            {/* Timeline Line/Dots (Desktop) */}
            <div className="absolute hidden md:block left-[calc(8rem+1.5rem)] top-10 bottom-0 w-px bg-white/10" />
            <div className="absolute hidden md:block left-[calc(8rem+1.2rem)] top-[2.6rem] w-3 h-3 rounded-full bg-white ring-4 ring-[#030303]" />

            {/* Left Column: Meta */}
            <div className="flex-shrink-0 w-full md:w-32 md:text-right pt-8 md:sticky md:top-24 self-start z-10">
                <div className="flex items-center md:flex-col md:items-end gap-3 md:gap-1">
                    <span className="text-sm font-mono text-white/50">{project.year || "2024"}</span>
                    {/* Client Pill */}
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono hidden md:inline-block">
                        {project.client}
                    </span>
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">

                {/* Title */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{project.title}</h2>
                    <span className="md:hidden mt-2 inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono">
                        {project.client}
                    </span>
                </div>

                {/* Media */}
                <div className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden aspect-video relative group/image">
                    <img src="/images/preview.png" alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105" />
                </div>

                {/* Actions */}
                {project.link && (
                    <div className="flex items-center gap-3">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
                        >
                            <span>Live Preview</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                )}

                {/* Description */}
                {project.description && (
                    <div className="text-white/70 leading-relaxed text-base md:text-lg max-w-2xl">
                        {project.description}
                    </div>
                )}

                {/* Tech Stack */}
                {project.tags && project.tags.length > 0 && (
                    <div className="pt-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <div key={tag} className="px-3 py-1.5 rounded-md bg-[#0A0A0A] border border-white/10 text-xs text-white/60 font-mono flex items-center gap-2 hover:border-white/20 transition-colors">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
