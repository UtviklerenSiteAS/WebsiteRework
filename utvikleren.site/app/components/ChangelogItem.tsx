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
    index: number;
}

export default function ChangelogItem({ project, index }: ChangelogItemProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative bg-[#111] border-2 border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors"
        >
            {/* Content Container */}
            <div className="flex flex-col gap-4">

                {/* Top Row: Header & Status */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        {/* Logo */}
                        {project.logo ? (
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10">
                                <img src={project.logo} alt={`${project.title} logo`} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center font-bold text-white/50 border border-white/10">
                                {project.title.substring(0, 1)}
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/30 hover:text-white transition-colors"
                                        title="Besøk nettside"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
                                <span>{project.client}</span>
                                <span>•</span>
                                <span>{project.category}</span>
                                {project.year && (
                                    <>
                                        <span>•</span>
                                        <span>{project.year}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`
                        px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                        ${project.status === 'Planlegging' ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' : ''}
                        ${project.status === 'Under arbeid' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                        ${project.status === 'Ferdig' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                    `}>
                        {project.status}
                    </div>
                </div>

                {/* Description */}
                {project.description && (
                    <p className="text-white/60 text-sm leading-relaxed pl-[4rem]">
                        {project.description}
                    </p>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pl-[4rem] mt-1">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] text-white/40">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Progress removed as per request */}

        </motion.div>
    );
}
