"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FolderKanban, Plus, Globe, Calendar, TrendingUp, Edit3, ExternalLink, Search, BarChart3, ChevronRight } from "lucide-react";
import AdminModal from "../../components/ui/AdminModal";
import WebsiteProjectForm from "../../components/forms/WebsiteProjectForm";
import Link from "next/link";

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
        <div className="p-6 md:p-12 text-white font-sans selection:bg-white selection:text-black">
            {/* Header */}
            <div className="mb-12">
                {pageError && (
                    <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-red-500 font-bold">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Database-feil
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {pageError} <br />
                            <span className="text-[10px] mt-1 block opacity-50">Tips: Sørg for at du har kjørt SQL-skriptet for "profiles" i Supabase-dashbordet.</span>
                        </p>
                    </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                            <FolderKanban size={28} className="text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Nettside Prosjekter</h1>
                            <p className="text-gray-400 mt-1">
                                {isAdmin ? "Administrer alle kundeprosjekter og brukere" : "Oversikt over dine aktive prosjekter"}
                            </p>
                        </div>
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => { setSelectedProject(null); setIsModalOpen(true); }}
                            className="px-8 py-4 bg-white text-black rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                        >
                            <Plus size={20} />
                            Nytt prosjekt
                        </button>
                    )}
                </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
                <div className="mb-12 space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Søk i prosjektnavn, beskrivelse eller e-post..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/30 transition-all text-lg"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCustomerId(null)}
                            className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-medium transition-all border ${!selectedCustomerId ? 'bg-white text-black border-white shadow-lg shadow-white/10' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                        >
                            Alle Kunder
                        </button>
                        {profiles.map((profile) => (
                            <button
                                key={profile.id}
                                onClick={() => setSelectedCustomerId(profile.id)}
                                className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-medium transition-all border ${selectedCustomerId === profile.id ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                            >
                                {profile.email}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                <StatCard icon={FolderKanban} color="text-blue-400" label="Totalt" value={stats.total} />
                <StatCard icon={Globe} color="text-emerald-400" label="Live" value={stats.live} />
                <StatCard icon={Calendar} color="text-amber-400" label="Vurdering" value={stats.review} />
                <StatCard icon={TrendingUp} color="text-blue-400" label="Utvikles" value={stats.inDevelopment} />
            </div>

            {/* Projects List */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold flex items-center gap-3">
                        {isAdmin ? "Alle Prosjekter" : "Dine Prosjekter"}
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-500 border border-white/10">
                            {filteredProjects.length}
                        </span>
                    </h2>
                </div>

                {filteredProjects.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-24 text-center grayscale opacity-50">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FolderKanban size={48} className="text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Ingen prosjekter funnet</h3>
                        <p className="text-gray-400 text-lg max-w-sm mx-auto">
                            {searchQuery ? `Det er ingen resultater for "${searchQuery}"` : isAdmin ? "Begynn med å opprette det første prosjektet." : "Du har ingen aktive prosjekter for øyeblikket."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500"
                            >
                                <div className="p-10">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
                                        <Link
                                            href={`/dashboard/nettside-prosjekter/${project.id}`}
                                            className="flex-1 group/title"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <h3 className="text-3xl font-bold tracking-tight group-hover/title:text-blue-400 transition-colors flex items-center gap-3">
                                                        {project.name}
                                                        <ChevronRight size={24} className="opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-blue-400" />
                                                    </h3>
                                                    <span className={`px-4 py-1.5 rounded-full text-[11px] uppercase font-black tracking-widest border ${getStatusStyles(project.status)}`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">{project.description}</p>
                                            </div>
                                        </Link>

                                        <div className="flex items-center gap-4 shrink-0">
                                            <Link
                                                href={`/dashboard/nettside-prosjekter/${project.id}`}
                                                className="flex items-center justify-center p-3.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-blue-400 transition-all hover:scale-105"
                                                title="Se trafikk-oversikt"
                                            >
                                                <BarChart3 size={24} />
                                            </Link>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-base font-bold transition-all"
                                                >
                                                    <ExternalLink size={20} />
                                                    Besøk
                                                </a>
                                            )}
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="p-3.5 text-black bg-white hover:bg-gray-200 rounded-2xl transition-all shadow-xl"
                                                >
                                                    <Edit3 size={24} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Fremdrift</span>
                                                <span className="text-xl font-bold">{project.progress}%</span>
                                            </div>
                                            {isAdmin && project.profiles && (
                                                <div className="text-right">
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">Kunde</span>
                                                    <span className="text-sm font-bold text-blue-400">{project.profiles.email}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Project Modal */}
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

function StatCard({ icon: Icon, color, label, value }: any) {
    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all group">
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-2.5 rounded-xl bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                </div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</h3>
            </div>
            <p className="text-4xl font-bold tabular-nums tracking-tighter">{value}</p>
        </div>
    );
}
