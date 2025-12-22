"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    BarChart3,
    Users,
    MousePointer2,
    Clock,
    Globe,
    TrendingUp,
    TrendingDown,
    Calendar,
    Filter,
    ArrowUpRight,
    UserPlus,
    Activity
} from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

export default function AdminAnalyticsDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("Siste 30 dager");
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || user.email !== 'post@utvikleren.site') {
                router.push("/dashboard");
                return;
            }
            setUser(user);
            setLoading(false);
        }
        checkAdmin();
    }, [supabase, router]);

    // Mock aggregate analytics data
    const globalStats = useMemo(() => ({
        totalVisitors: { value: "12,482", trend: "+18.2%", isUp: true },
        totalPageviews: { value: "48,930", trend: "+24.5%", isUp: true },
        avgSession: { value: "3m 12s", trend: "+5.1%", isUp: true },
        activeNow: { value: "42", trend: "Normal", isUp: true },
    }), []);

    const topProjects = [
        { name: "Min Nye Nettbutikk", visitors: "3,204", growth: "+12%", status: "Live" },
        { name: "Elias Portfolio", visitors: "2,150", growth: "+8%", status: "Live" },
        { name: "Test Prosjekt", visitors: "1,284", growth: "+42%", status: "Under utvikling" },
        { name: "Bedriftside AS", visitors: "940", growth: "-2%", status: "Live" },
    ];

    const recentActivity = [
        { user: "eliaselvaa@gmail.com", action: "Signerte opp", time: "2 timer siden", icon: <UserPlus className="text-blue-400" /> },
        { user: "post@utvikleren.site", action: "Oppdaterte 'Test Prosjekt'", time: "5 timer siden", icon: <Activity className="text-emerald-400" /> },
        { user: "kunde1@example.com", action: "Logget inn", time: "12 timer siden", icon: <Globe className="text-amber-400" /> },
    ];

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-12 text-white font-sans selection:bg-white selection:text-black min-h-screen bg-black">
            {/* Header */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
                                Global Oversikt
                            </span>
                        </div>
                        <p className="text-gray-400">Total trafikk og ytelse på tvers av hele plattformen</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
                            <Calendar size={18} className="text-gray-500" />
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="bg-transparent border-none focus:outline-none text-sm font-bold"
                            >
                                <option>I dag</option>
                                <option>Siste 7 dager</option>
                                <option>Siste 30 dager</option>
                                <option>Dette året</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <AnalyticsCard title="Totalt Besøkende" value={globalStats.totalVisitors.value} trend={globalStats.totalVisitors.trend} isUp={globalStats.totalVisitors.isUp} icon={Users} />
                <AnalyticsCard title="Totalt Sidevisninger" value={globalStats.totalPageviews.value} trend={globalStats.totalPageviews.trend} isUp={globalStats.totalPageviews.isUp} icon={MousePointer2} />
                <AnalyticsCard title="Snittid per Sesjon" value={globalStats.avgSession.value} trend={globalStats.avgSession.trend} isUp={globalStats.avgSession.isUp} icon={Clock} />
                <AnalyticsCard title="Aktive Nå" value={globalStats.activeNow.value} trend={globalStats.activeNow.trend} isUp={true} icon={Activity} pulse />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Global Traffic Chart */}
                <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[500px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Global Trafikkutvikling</h3>
                            <p className="text-gray-500 text-sm italic">Aggregate besøkende på alle kunder</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-2 md:gap-3 px-4">
                        {[30, 45, 35, 60, 50, 75, 65, 80, 70, 95, 85, 100, 90, 80, 85, 90, 85, 95, 100, 90, 85, 80, 75, 85, 90, 100, 110, 120, 130, 140].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div
                                    className="w-full bg-gradient-to-t from-purple-600/20 to-purple-400 rounded-t-sm transition-all duration-700 group-hover:bg-blue-400"
                                    style={{ height: `${h / 1.5}%` }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6 px-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                        <span>1. Des</span>
                        <span>10. Des</span>
                        <span>20. Des</span>
                        <span>30. Des</span>
                    </div>
                </div>

                {/* Side Content */}
                <div className="space-y-8">
                    {/* Top Projects */}
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <TrendingUp size={20} className="text-blue-400" />
                            Topp Prosjekter
                        </h3>
                        <div className="space-y-6">
                            {topProjects.map((proj, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div>
                                        <p className="font-bold text-sm mb-0.5 group-hover:text-blue-400 transition-colors">{proj.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{proj.status}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-xs font-bold">{proj.visitors}</p>
                                        <p className={`text-[10px] ${proj.growth.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{proj.growth}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/dashboard/nettside-prosjekter"
                            className="mt-8 pt-4 border-t border-white/5 w-full flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group"
                        >
                            Alle prosjekter
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Activity size={20} className="text-emerald-400" />
                            Siste Aktivitet
                        </h3>
                        <div className="space-y-6">
                            {recentActivity.map((act, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        {act.icon}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold truncate">{act.user}</p>
                                        <p className="text-[10px] text-gray-400">{act.action}</p>
                                        <p className="text-[9px] text-gray-600 mt-1 uppercase font-mono">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyticsCard({ title, value, trend, isUp, icon: Icon, pulse }: any) {
    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all group relative overflow-hidden">
            {pulse && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-emerald-400 tracking-tighter">Live</span>
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={20} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                {!pulse && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {trend}
                    </div>
                )}
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-bold tabular-nums tracking-tighter">{value}</h3>
        </div>
    );
}
