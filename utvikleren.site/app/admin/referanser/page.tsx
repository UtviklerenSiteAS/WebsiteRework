"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ProjectEditor, { Project } from "./editor";

export default function AdminReferanserPage() {
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [accessDenied, setAccessDenied] = useState(false);

    const supabase = createClient();

    // Fetch User and Check Access
    useEffect(() => {
        const checkAccess = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setAccessDenied(true);
                setIsLoading(false);
                return;
            }

            // Clean check against env list
            const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
            if (!user.email || !adminEmails.includes(user.email)) {
                setAccessDenied(true);
                setIsLoading(false);
                return;
            }

            setUser(user);
            fetchProjects();
        };

        checkAccess();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            toast.error("Kunne ikke laste prosjekter");
            console.error(error);
        } else {
            setProjects(data || []);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Er du sikker på at du vil slette dette prosjektet?")) return;

        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
            toast.error("Kunne ikke slette prosjekt");
        } else {
            toast.success("Prosjekt slettet");
            fetchProjects();
        }
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentProject(null);
        setIsEditing(true);
    };

    if (isLoading && !user && !accessDenied) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Laster Admin...</div>;

    if (accessDenied) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-3xl font-bold text-red-500">Ingen tilgang</h1>
                <p className="text-white/50">Du har ikke tillatelse til å se denne siden.</p>
                <div className="text-xs font-mono bg-white/5 p-4 rounded">
                    E-post: {user?.email || "Ikke logget inn"} <br />
                    Krevd i .env: NEXT_PUBLIC_ADMIN_EMAILS
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Prosjekt Admin</h1>
                        <p className="text-white/50">Administrer dine referanser.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <span>+ Nytt Prosjekt</span>
                    </button>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {projects.length === 0 ? (
                        <div className="p-10 border border-white/10 rounded-2xl text-center text-white/30 italic">
                            Ingen prosjekter funnet. Opprett et nytt for å komme i gang.
                        </div>
                    ) : (
                        projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layoutId={project.id}
                                className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:bg-white/[0.07] transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {project.logo ? (
                                        <img src={project.logo} alt="" className="w-10 h-10 object-contain rounded-lg bg-black/20" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs">?</div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold">{project.title}</h3>
                                        <div className="flex gap-3 text-sm text-white/50 mt-1">
                                            <span>{project.client}</span>
                                            <span>•</span>
                                            <span>{project.year}</span>
                                            <span>•</span>
                                            <span className={`
                                                px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                                                ${project.status === 'Planlegging' ? 'bg-gray-500/20 text-gray-400' : ''}
                                                ${project.status === 'Under arbeid' ? 'bg-blue-500/20 text-blue-400' : ''}
                                                ${project.status === 'Ferdig' ? 'bg-green-500/20 text-green-400' : ''}
                                            `}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex-1 md:flex-none text-center"
                                    >
                                        Rediger
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id!)}
                                        className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors flex-1 md:flex-none text-center"
                                    >
                                        Slett
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

            </div>

            {/* Editor Modal */}
            {isEditing && (
                <ProjectEditor
                    project={currentProject}
                    onClose={() => setIsEditing(false)}
                    onSaved={fetchProjects}
                />
            )}
        </main>
    );
}
