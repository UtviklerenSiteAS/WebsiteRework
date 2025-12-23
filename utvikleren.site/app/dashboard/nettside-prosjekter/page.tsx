"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FolderKanban, Plus, Globe, Calendar, TrendingUp, Edit3, ExternalLink, Search, BarChart3, ChevronRight } from "lucide-react";
import AdminModal from "../../components/ui/AdminModal";
import WebsiteProjectForm from "../../components/forms/WebsiteProjectForm";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    url: string;
    analytics_url?: string;
    progress: number;
    user_id: string;
    created_at: string;
    profiles?: {
        email: string;
        full_name: string;
    }
}

interface Profile {
    id: string;
    email: string;
    full_name: string;
}

export default function NettsidenProsjekterDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [pageError, setPageError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const fetchProjects = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("website_projects")
                .select(`
                    *,
                    profiles (
                        email,
                        full_name
                    )
                `)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Supabase error fetching projects:", error.message, error.details, error.hint);
                throw error;
            }
            setProjects(data || []);
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            setPageError("Klarte ikke hente prosjekter. Vennligst sjekk at databasen er satt opp riktig.");
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    const fetchProfiles = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("email");
            if (error) throw error;
            setProfiles(data || []);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    }, [supabase]);

    useEffect(() => {
        async function init() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
                const isUserAdmin = user.email === 'post@utvikleren.site';
                setIsAdmin(isUserAdmin);
                fetchProjects();
                if (isUserAdmin) fetchProfiles();
            }
        }
        init();
    }, [router, supabase, fetchProjects, fetchProfiles]);

    const handleSuccess = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        fetchProjects();
    };

    const handleEdit = (project: Project) => {
        if (!isAdmin) return;
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Godkjent':
            case 'Live':
                return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
            case 'Avvist':
                return 'bg-red-500/20 text-red-400 border-red-500/20';
            case 'Sendt til vurdering':
                return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
            case 'I utvikling':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
            case 'Planlagt':
                return 'bg-white/10 text-gray-400 border-white/10';
            default:
                return 'bg-white/5 text-gray-400 border-white/5';
        }
    };

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch =
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.profiles?.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCustomer = !selectedCustomerId || project.user_id === selectedCustomerId;

            return matchesSearch && matchesCustomer;
        });
    }, [projects, searchQuery, selectedCustomerId]);

    const stats = useMemo(() => ({
        total: filteredProjects.length,
        live: filteredProjects.filter(p => p.status === "Live").length,
        review: filteredProjects.filter(p => p.status === "Sendt til vurdering").length,
        inDevelopment: filteredProjects.filter(p => p.status === "I utvikling").length,
    }), [filteredProjects]);

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24 selection:bg-white selection:text-black font-sans">
            {/* Minimal Header */}
            <header className="mb-24">
                {pageError && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-medium"
                    >
                        {pageError}
                    </motion.div>
                )}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                            Nettside <br />
                            <span className="text-white/40">Prosjekter</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light tracking-tight max-w-xl">
                            {isAdmin ? "Administrer og overvåk alle aktive kundeprosjekter." : "Følg fremdriften og administrer dine nettsideprosjekter."}
                        </p>
                    </motion.div>
                    
                    {isAdmin && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => { setSelectedProject(null); setIsModalOpen(true); }}
                            className="px-10 py-5 bg-white text-black rounded-full font-bold transition-all hover:bg-gray-200 active:scale-95 flex items-center gap-3"
                        >
                            <Plus size={20} />
                            Nytt prosjekt
                        </motion.button>
                    )}
                </div>
            </header>

            {/* Admin Controls - Minimalized */}
            {isAdmin && (
                <div className="mb-24 space-y-12">
                    <div className="relative group max-w-2xl">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-white transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Søk i prosjekter..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-b border-white/10 py-6 pl-10 pr-6 focus:outline-none focus:border-white transition-all text-xl font-light placeholder:text-gray-800"
                        />
                    </div>

                    <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCustomerId(null)}
                            className={`whitespace-nowrap text-sm font-bold tracking-widest uppercase transition-all ${!selectedCustomerId ? 'text-white' : 'text-gray-700 hover:text-gray-400'}`}
                        >
                            Alle Kunder
                        </button>
                        {profiles.map((profile) => (
                            <button
                                key={profile.id}
                                onClick={() => setSelectedCustomerId(profile.id)}
                                className={`whitespace-nowrap text-sm font-bold tracking-widest uppercase transition-all ${selectedCustomerId === profile.id ? 'text-white' : 'text-gray-700 hover:text-gray-400'}`}
                            >
                                {profile.email.split('@')[0]}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects Section */}
            <div className="space-y-32">
                {filteredProjects.length === 0 ? (
                    <div className="py-32 border-t border-white/5">
                        <p className="text-2xl text-gray-700 font-light tracking-tight italic">
                            {searchQuery ? `Ingen resultater for "${searchQuery}"` : "Ingen aktive prosjekter akkurat nå."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-16">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="group pt-16 border-t border-white/5"
                            >
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
                                    {/* Main Info */}
                                    <div className="xl:col-span-7">
                                        <div className="flex flex-wrap items-center gap-4 mb-8">
                                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${project.status === 'Live' ? 'text-emerald-500' : 'text-blue-500'}`}>
                                                {project.status}
                                            </span>
                                            <span className="text-gray-800 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                {new Date(project.created_at).toLocaleDateString('nb-NO')}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/dashboard/nettside-prosjekter/${project.id}`}
                                            className="group/title inline-block mb-8"
                                        >
                                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter group-hover/title:text-white/60 transition-colors">
                                                {project.name}
                                            </h3>
                                        </Link>
                                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mb-12">
                                            {project.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-4">
                                            <Link
                                                href={`/dashboard/nettside-prosjekter/${project.id}`}
                                                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all"
                                            >
                                                Se detaljer
                                            </Link>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-8 py-4 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white hover:text-black transition-all"
                                                >
                                                    Gå til nettside
                                                </a>
                                            )}
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress & Meta */}
                                    <div className="xl:col-span-5 flex flex-col justify-center">
                                        <div className="mb-12">
                                            <div className="flex justify-between items-baseline mb-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">Fremdrift</span>
                                                <span className="text-4xl font-bold tracking-tighter">{project.progress}%</span>
                                            </div>
                                            <div className="h-[2px] bg-white/5 w-full relative">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${project.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                                    className="absolute inset-y-0 left-0 bg-white"
                                                />
                                            </div>
                                        </div>
                                        
                                        {isAdmin && project.profiles && (
                                            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 mb-2">Ansvarlig Kunde</p>
                                                <p className="text-sm font-bold text-gray-400">{project.profiles.email}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal remains the same */}
            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedProject ? "Rediger prosjekt" : "Nytt prosjekt"}
            >
                <WebsiteProjectForm
                    initialData={selectedProject}
                    onSuccess={handleSuccess}
                    isAdmin={isAdmin}
                />
            </AdminModal>
        </div>
    );
}
