"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    BarChart3,
    Users,
    MousePointer2,
    Clock,
    Globe,
    ArrowLeft,
    ExternalLink,
    TrendingUp,
    TrendingDown,
    Calendar,
    Filter
} from "lucide-react";
import Link from "next/link";

interface Project {
    id: string;
    name: string;
    url: string;
    status: string;
    analytics_url?: string;
}

export default function ProjectTrafficOverview() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("Last 7 Days");
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function fetchProject() {
            try {
                const { data, error } = await supabase
                    .from("website_projects")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                router.push("/dashboard/nettside-prosjekter");
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id, supabase, router]);

    // Mock analytics data
    const stats = useMemo(() => ({
        visitors: { value: "1,284", trend: "+12.5%", isUp: true },
        pageviews: { value: "4,932", trend: "+8.2%", isUp: true },
        sessionDuration: { value: "2m 45s", trend: "-2.1%", isUp: false },
        bounceRate: { value: "42.3%", trend: "-5.4%", isUp: true }, // bounce rate down is good
    }), []);

    const topPages = [
        { path: "/", views: "2,103", percentage: 42 },
        { path: "/tjenester", views: "1,050", percentage: 21 },
        { path: "/referanser", views: "842", percentage: 17 },
        { path: "/blogg", views: "521", percentage: 10 },
        { path: "/kontakt", views: "416", percentage: 8 },
    ];

    const sources = [
        { name: "Direct", value: 45, color: "bg-blue-500" },
        { name: "Organic Search", value: 30, color: "bg-emerald-500" },
        { name: "Social Media", value: 15, color: "bg-amber-500" },
        { name: "Referrals", value: 10, color: "bg-purple-500" },
    ];

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="p-6 md:p-12 text-white font-sans selection:bg-white selection:text-black min-h-screen bg-black">
            {/* Header */}
            <div className="mb-12">
                <Link
                    href="/dashboard/nettside-prosjekter"
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Tilbake til prosjekter
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
                                Analyse
                            </span>
                        </div>
                        <p className="text-gray-400 flex items-center gap-2">
                            <Globe size={16} />
                            {project.url || "Ingen URL registrert"}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
                            <Calendar size={18} className="text-gray-500" />
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="bg-transparent border-none focus:outline-none text-sm font-bold"
                            >
                                <option>Siste 7 dager</option>
                                <option>Siste 30 dager</option>
                                <option>Denne måneden</option>
                            </select>
                        </div>
                        {project.analytics_url && (
                            <a
                                href={project.analytics_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                            >
                                Full oversikt
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <AnalyticsCard title="Unike Besøkende" value={stats.visitors.value} trend={stats.visitors.trend} isUp={stats.visitors.isUp} icon={Users} />
                <AnalyticsCard title="Sidevisninger" value={stats.pageviews.value} trend={stats.pageviews.trend} isUp={stats.pageviews.isUp} icon={MousePointer2} />
                <AnalyticsCard title="Gj.snittlig Tid" value={stats.sessionDuration.value} trend={stats.sessionDuration.trend} isUp={stats.sessionDuration.isUp} icon={Clock} />
                <AnalyticsCard title="Sprettfrekvens" value={stats.bounceRate.value} trend={stats.bounceRate.trend} isUp={stats.bounceRate.isUp} icon={TrendingDown} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder */}
                <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[450px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Besøkstrender</h3>
                            <p className="text-gray-500 text-sm italic">Oversikt over daglig trafikk</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                <span className="text-sm text-gray-400">Besøkende</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-3 h-3 bg-white/20 rounded-full" />
                                <span className="text-sm text-gray-400">Forrige periode</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-2 md:gap-4 px-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 100, 75, 40, 50, 60].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-600/20 to-blue-400 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-300"
                                    style={{ height: `${h}%` }}
                                />
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {Math.floor(h * 15.4)} besøk
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6 px-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        <span>Man</span>
                        <span>Tir</span>
                        <span>Ons</span>
                        <span>Tor</span>
                        <span>Fre</span>
                        <span>Lør</span>
                        <span>Søn</span>
                    </div>
                </div>

                {/* Side Cards */}
                <div className="space-y-8">
                    {/* Top Pages */}
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <BarChart3 size={20} className="text-blue-400" />
                            Toppsider
                        </h3>
                        <div className="space-y-6">
                            {topPages.map((page, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-mono text-gray-400">{page.path}</span>
                                        <span className="font-bold">{page.views}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white/20 rounded-full"
                                            style={{ width: `${page.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Filter size={20} className="text-emerald-400" />
                            Trafikkilder
                        </h3>
                        <div className="space-y-4">
                            {sources.map((source, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${source.color}`} />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-sm text-gray-400 uppercase tracking-tight font-medium">{source.name}</span>
                                        <span className="text-sm font-bold">{source.value}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Fake donut chart ring */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                            <div className="relative w-24 h-24 rounded-full border-[12px] border-white/5 flex items-center justify-center">
                                <div className="absolute top-0 left-0 w-full h-full rounded-full border-[12px] border-transparent border-t-blue-500 border-r-emerald-500 rotate-45" />
                                <span className="text-[10px] font-black uppercase text-gray-500">Kilder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyticsCard({ title, value, trend, isUp, icon: Icon }: any) {
    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {trend}
                </div>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-bold tabular-nums tracking-tighter">{value}</h3>
        </div>
    );
}
