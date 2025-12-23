"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, ExternalLink, Edit, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import AdminModal from "../components/ui/AdminModal";
import ReferanseForm from "../components/forms/ReferanseForm";

interface Project {
    id: string;
    client: string;
    title: string;
    description: string;
    detailed_content?: string;
    review_text?: string;
    review_author?: string;
    tags: string[];
    color: string;
    image: string;
}

export default function ReferanserPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const supabase = createClient();

    const fetchData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('referanser')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Error fetching referanser:", error);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        async function init() {
            await fetchData();
            // Check admin
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email === 'post@utvikleren.site') {
                setIsAdmin(true);
            }
        }
        init();
    }, [fetchData, supabase]);

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchData(); // Refresh list
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-24 px-6 relative border-b border-white/10">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-9xl font-medium tracking-tighter text-white leading-[0.85] -ml-1"
                        >
                            Våre <br /> Referanser
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed pt-8 font-light"
                        >
                            Vi lar resultatene snakke for seg selv. Her er et utvalg av de prosjektene vi er mest stolte av.
                        </motion.p>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={handleCreate}
                            className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all hover:scale-105"
                        >
                            <Plus size={18} />
                            Ny referanse
                        </button>
                    )}
                </div>
            </section>

            {/* Project Grid */}
            <section className="py-12 md:py-24 px-6 w-full">
                <div className="max-w-[1400px] mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-white/20" />
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                >
                                    <Link
                                        href={`/referanser/${project.id}`}
                                        className="group cursor-pointer relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 block"
                                    >
                                        {/* Visual Background */}
                                        <div className={`absolute inset-0 bg-gray-900 transition-all duration-500 md:group-hover:scale-105`}>
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.client}
                                                fill
                                                className="object-cover opacity-80"
                                            />
                                        ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br from-${project.color}-500/20 to-transparent opacity-60`} />
                                            )}
                                        </div>

                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

                                        {/* Admin Edit Button */}
                                        {isAdmin && (
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit(project); }}
                                                className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
                                            >
                                                <Edit size={20} />
                                            </button>
                                        )}

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <div className="space-y-4">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {project.tags.map((tag, i) => (
                                                        <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono text-white border border-white/10">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div>
                                                    <h3 className="text-3xl font-medium tracking-tight text-white mb-2">
                                                        {project.client}
                                                    </h3>
                                                    <p className="text-lg text-gray-300 font-light max-w-md line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                {/* Metric / Action */}
                                                <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                                                        <ArrowRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-500">
                            <p className="text-xl">Ingen referanser funnet ennå.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Admin Modal */}
            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedProject ? `Endre: ${selectedProject.client}` : "Ny referanse"}
            >
                <ReferanseForm
                    initialData={selectedProject}
                    onSuccess={handleSuccess}
                />
            </AdminModal>

            {/* CTA */}
            <section className="py-40 border-t border-white/10 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12">
                        Bli vår neste suksesshistorie.
                    </h2>
                    <Link
                        href="/#contact"
                        className="inline-block px-12 py-5 bg-white text-black text-xl font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Start Samarbeid
                    </Link>
                </div>
            </section>
        </div>
    );
}
