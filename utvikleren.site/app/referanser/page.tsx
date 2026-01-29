"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import ChangelogItem from "../components/ChangelogItem";
import { Project } from "../admin/referanser/editor";

export default function ReferanserPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) {
                setProjects(data);
            }
            setIsLoading(false);
        };

        fetchProjects();
    }, []);

    return (
        <main className="relative min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 overflow-hidden">
            <div className="relative z-10">

                {/* Header Section */}
                <section className="relative pt-40 pb-12 w-full px-8">
                    <div className="w-full"> {/* Full width */}

                        <div className="flex flex-col items-start gap-8">
                            <div className="space-y-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
                                >
                                    Utvalgte Referanser
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-xl text-white/60 font-light leading-relaxed max-w-2xl"
                                >
                                    En tidslinje over våre mest virkningsfulle leveranser og samarbeid.
                                </motion.p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Changelog List Section */}
                <section className="relative pb-32 w-full px-8">
                    <div className="w-full"> {/* Full width */}
                        {isLoading ? (
                            <div className="text-white/40 italic">Laster prosjekter...</div>
                        ) : projects.length === 0 ? (
                            <div className="text-white/40 italic">Ingen prosjekter funnet.</div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {projects.map((project, index) => {
                                    // Map flat DB structure to simplified component structure
                                    const mappedProject = {
                                        id: project.id || "temp-id",
                                        title: project.title,
                                        client: project.client,
                                        category: project.category,
                                        year: project.year,
                                        description: project.description,
                                        tags: project.tags,
                                        status: (project.status as any) || "Planlegging",
                                        logo: project.logo,
                                        link: project.link,
                                        avatars: project.avatars || [],
                                    };

                                    return (
                                        <ChangelogItem key={project.id} project={mappedProject} index={index} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </main>
    );
}
