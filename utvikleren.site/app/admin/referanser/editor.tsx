"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Define the shape of our project based on the DB schema
export interface Project {
    id?: string;
    title: string;
    client: string;
    year: string;
    category: string;
    status: string;
    lead_name?: string;
    location?: string;
    logo?: string;
    description?: string;
    image_url?: string;
    tags?: string[];
    progress_stage?: string;
    progress_current?: number;
    progress_total?: number;
    progress_updated_at?: string;
    avatars?: string[];
    link?: string;
}

interface EditorProps {
    project?: Project | null; // null means new project
    onClose: () => void;
    onSaved: () => void;
}

export default function ProjectEditor({ project, onClose, onSaved }: EditorProps) {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Project>({
        title: "",
        client: "",
        year: new Date().getFullYear().toString(),
        category: "Web",
        status: "Under arbeid",
        lead_name: "",
        location: "",
        logo: "",
        link: "",
        description: "",
        image_url: "",
        tags: [],
        progress_stage: "Planlegging",
        progress_current: 1,
        progress_total: 10,
        progress_updated_at: "Just now",
        avatars: [],
    });

    // Populate form if editing
    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase
                .from("projects")
                .upsert({
                    ...formData,
                    // If we have an ID, use it (update), otherwise undefined (insert)
                    id: project?.id,
                    // updated_at: new Date().toISOString(), // Supabase likely handles this or column is missing
                })
                .select();

            if (error) throw error;

            toast.success(project ? "Prosjekt oppdatert!" : "Prosjekt opprettet!");
            onSaved();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Kunne ikke lagre prosjekt");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {project ? "Rediger Prosjekt" : "Nytt Prosjekt"}
                    </h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Client</label>
                            <input name="client" value={formData.client} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Year</label>
                            <input name="year" value={formData.year} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Category</label>
                            <input name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-mono text-white/50 uppercase">Status (Progress)</label>
                            <select
                                name="status"
                                value={formData.status}
                                // @ts-ignore
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white appearance-none cursor-pointer"
                            >
                                <option value="Planning">Planning</option>
                                <option value="Working">Working</option>
                                <option value="Finished">Finished</option>
                            </select>
                        </div>
                    </div>

                    {/* URLs */}
                    <div className="space-y-4 border-t border-white/10 pt-4">
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Logo URL</label>
                            <input name="logo" value={formData.logo || ""} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Hovedbilde URL</label>
                            <input name="image_url" value={formData.image_url || ""} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-white/50 uppercase">Nettside URL</label>
                            <input name="link" value={formData.link || ""} onChange={handleChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs" />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : "Save Project"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
