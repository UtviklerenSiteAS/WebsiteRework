"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { 
    LogOut, 
    User as UserIcon, 
    ArrowRight, 
    FolderKanban, 
    Zap, 
    Shield, 
    MessageSquare,
    ExternalLink,
    Bell,
    Clock,
    CheckCircle2,
    Calendar,
    ChevronRight,
    Sparkles,
    Settings
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface DashboardStats {
    activeProjects: number;
    completedTasks: number;
    upcomingMeetings: number;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats>({
        activeProjects: 0,
        completedTasks: 0,
        upcomingMeetings: 0
    });
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function init() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
                
                // Fetch some dummy/real stats
                const { count: projectCount } = await supabase
                    .from('website_projects')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id);
                
                setStats({
                    activeProjects: projectCount || 0,
                    completedTasks: 12,
                    upcomingMeetings: 1
                });
                
                setLoading(false);
            }
        }
        init();
    }, [router, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "God morgen";
        if (hour < 18) return "God ettermiddag";
        return "God kveld";
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24 selection:bg-white selection:text-black">
            <div className="max-w-6xl mx-auto">
                
                {/* Minimal Header */}
                <header className="mb-24 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                            {greeting()}, <br />
                            <span className="text-white/40">{user?.user_metadata?.full_name?.split(' ')[0] || 'Bruker'}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-light tracking-tight max-w-xl">
                            Her er en oversikt over din digitale tilstedeværelse og aktive prosjekter hos oss.
                        </p>
                    </motion.div>
                </header>

                {/* Apple-style Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-32">
                    
                    {/* Featured Status Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden group"
                    >
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">System Status</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-md">
                                    Alle dine systemer kjører optimalt.
                                </h2>
                                <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm mb-12">
                                    Vi overvåker dine nettsider og AI-tjenester døgnet rundt for å sikre 100% oppetid.
                                </p>
                            </div>
                            <Link 
                                href="/dashboard/nettside-prosjekter"
                                className="inline-flex items-center gap-2 text-sm font-bold hover:text-white transition-colors group/link"
                            >
                                Se dine prosjekter 
                                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none transition-all duration-1000 group-hover:bg-white/[0.05]" />
                    </motion.div>

                    {/* Simple Stats Box */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-4 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-12 flex flex-col justify-between"
                    >
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">Aktive Prosjekter</h3>
                        <div className="flex items-baseline gap-3">
                            <span className="text-7xl font-bold tracking-tighter">{stats.activeProjects}</span>
                            <span className="text-gray-500 font-light text-xl">Løpende</span>
                        </div>
                        <div className="mt-auto pt-12 border-t border-white/5">
                            <p className="text-xs text-gray-600 font-medium leading-relaxed">
                                Neste planlagte oppdatering er {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('nb-NO')}.
                            </p>
                        </div>
                    </motion.div>

                    {/* AI Feature Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-4 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-12 flex flex-col justify-between group cursor-pointer hover:border-white/10 transition-all"
                    >
                        <Zap size={32} className="text-white mb-12" />
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight mb-2">AI Resepsjonist</h4>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">
                                Automatiser din kundesupport med vår nyeste AI-teknologi.
                            </p>
                        </div>
                    </motion.div>

                    {/* Maintenance Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-4 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-12 flex flex-col justify-between group cursor-pointer hover:border-white/10 transition-all"
                    >
                        <Shield size={32} className="text-white mb-12" />
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight mb-2">Systemsikkerhet</h4>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">
                                Din data er beskyttet med Enterprise-grade kryptering.
                            </p>
                        </div>
                    </motion.div>

                    {/* Support Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-4 bg-white text-black rounded-[2.5rem] p-12 flex flex-col justify-between group cursor-pointer hover:bg-gray-100 transition-all"
                    >
                        <MessageSquare size={32} className="mb-12" />
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight mb-2 text-black">Trenger du hjelp?</h4>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                Vårt team er her for å hjelpe deg døgnet rundt.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Credits */}
                <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.3em]">© 2025 Utvikleren.site — Minimalist Dashboard</p>
                    <div className="flex gap-8">
                        <Link href="/kontakt" className="text-[10px] font-bold text-gray-700 hover:text-white transition-colors uppercase tracking-[0.2em]">Support</Link>
                        <Link href="/" className="text-[10px] font-bold text-gray-700 hover:text-white transition-colors uppercase tracking-[0.2em]">Privacy</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}

// Sub-components for better organization

function QuickStat({ icon: Icon, label, value, color, trend, subtext }: any) {
    const colors: any = {
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };

    return (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 hover:border-white/10 transition-all group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${colors[color]}`}>
                <Icon size={24} />
            </div>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-2">{label}</p>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tighter">{value}</span>
                {trend && <span className="text-[10px] font-black uppercase text-emerald-500">{trend}</span>}
            </div>
            {subtext && <p className="text-[11px] text-gray-500 mt-1 font-medium">{subtext}</p>}
        </div>
    );
}

function ActivityItem({ icon: Icon, title, desc, time, color }: any) {
    const colors: any = {
        blue: "bg-blue-500",
        emerald: "bg-emerald-500",
        purple: "bg-purple-500",
    };

    return (
        <div className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all">
            <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${colors[color]} shadow-[0_0_10px_rgba(255,255,255,0.1)]`} />
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h5 className="text-sm font-bold text-white">{title}</h5>
                    <span className="text-[10px] font-mono text-gray-600 uppercase">{time}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed truncate">{desc}</p>
            </div>
        </div>
    );
}

function LinkItem({ icon: Icon, label, href }: any) {
    return (
        <Link 
            href={href}
            className="flex items-center gap-3 py-2 text-sm text-gray-500 hover:text-white transition-colors group"
        >
            <Icon size={14} className="opacity-50 group-hover:opacity-100" />
            <span className="font-medium tracking-tight">{label}</span>
        </Link>
    );
}
