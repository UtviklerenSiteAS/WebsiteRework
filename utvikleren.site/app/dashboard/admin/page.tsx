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
import { motion } from "framer-motion";

export default function AdminAnalyticsDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("Siste 30 dager");
    const supabase = createClient();
    const router = useRouter();

    const [stats, setStats] = useState({
        totalVisitors: "0",
        totalPageviews: "0",
        activeNow: "0",
        avgSession: "N/A"
    });
    const [topPages, setTopPages] = useState<{ path: string; count: number }[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let subscription: any;

        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || user.email !== 'post@utvikleren.site') {
                router.push("/dashboard");
                return;
            }
            setUser(user);

            const fetchStats = async () => {
                // ... (rest of the fetching logic remains the same)
                const { count: totalPageviews } = await supabase
                    .from('analytics_visits')
                    .select('*', { count: 'exact', head: true });

                const { data: uniqueSessions } = await supabase
                    .from('analytics_visits')
                    .select('session_id');
                const uniqueCount = new Set(uniqueSessions?.map(s => s.session_id)).size;

                const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
                const { data: activeSessions } = await supabase
                    .from('analytics_visits')
                    .select('session_id')
                    .gt('created_at', tenMinsAgo);
                const activeCount = new Set(activeSessions?.map(s => s.session_id)).size;

                const { data: visits } = await supabase
                    .from('analytics_visits')
                    .select('path');
                const pathCounts: Record<string, number> = {};
                visits?.forEach(v => {
                    pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
                });
                const sortedPaths = Object.entries(pathCounts)
                    .map(([path, count]) => ({ path, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
                const { data: lastMonthVisits } = await supabase
                    .from('analytics_visits')
                    .select('created_at')
                    .gt('created_at', thirtyDaysAgo);

                const dailyCountsAt = new Array(30).fill(0);
                lastMonthVisits?.forEach(v => {
                    const dayDiff = Math.floor((Date.now() - new Date(v.created_at).getTime()) / (1000 * 60 * 60 * 24));
                    if (dayDiff < 30) dailyCountsAt[29 - dayDiff]++;
                });

                const { data: recentVisits } = await supabase
                    .from('analytics_visits')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setStats({
                    totalVisitors: uniqueCount.toLocaleString(),
                    totalPageviews: (totalPageviews || 0).toLocaleString(),
                    activeNow: activeCount.toString(),
                    avgSession: "2m 45s"
                });
                setTopPages(sortedPaths);
                setChartData(dailyCountsAt);
                setActivities(recentVisits || []);
                setLoading(false);
            };

            await fetchStats();
            interval = setInterval(fetchStats, 30000);

            subscription = supabase
                .channel('analytics_realtime')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_visits' }, (payload) => {
                    setStats(prev => ({
                        ...prev,
                        totalPageviews: (parseInt(prev.totalPageviews.replace(/,/g, '')) + 1).toLocaleString(),
                    }));
                    setActivities(prev => [payload.new, ...prev].slice(0, 5));
                })
                .subscribe();
        }

        fetchData();

        return () => {
            if (interval) clearInterval(interval);
            if (subscription) supabase.removeChannel(subscription);
        };
    }, [supabase, router]);

    const recentActivity = activities.map(act => ({
        user: "Gjest",
        action: `Besøkte ${act.path}`,
        time: new Date(act.created_at).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }),
        icon: <Globe className="text-blue-400" />
    }));

    if (loading) {
        return (
            <div className="bg-[#050505] min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-12 lg:p-16 text-white font-sans selection:bg-white selection:text-black min-h-screen bg-[#050505]">
            {/* Header */}
            <div className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                Global Analytics
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            Admin <br />
                            <span className="text-gray-500">Dashboard</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-3">
                            <Calendar size={18} className="text-gray-500" />
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="bg-transparent border-none focus:outline-none text-sm font-bold appearance-none cursor-pointer"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <AnalyticsCard title="Totalt Besøkende" value={stats.totalVisitors} trend="+12%" isUp={true} icon={Users} />
                <AnalyticsCard title="Totalt Sidevisninger" value={stats.totalPageviews} trend="+24%" isUp={true} icon={MousePointer2} />
                <AnalyticsCard title="Snittid per Sesjon" value={stats.avgSession} trend="Optimalt" isUp={true} icon={Clock} />
                <AnalyticsCard title="Aktive Nå" value={stats.activeNow} trend="Live" isUp={true} icon={Activity} pulse />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Global Traffic Chart */}
                <div className="lg:col-span-8 bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-12 flex flex-col justify-between min-h-[500px] hover:border-white/10 transition-colors group">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">Trafikkutvikling</h3>
                            <p className="text-gray-500 text-sm font-medium">Besøkende de siste 30 dagene</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-1.5 md:gap-2 px-2">
                        {(() => {
                            const maxVal = Math.max(...chartData, 1);
                            return chartData.map((h, i) => (
                                <div key={i} className="flex-1 group/bar relative">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(h / maxVal) * 100}%` }}
                                        transition={{ delay: i * 0.02, duration: 1, ease: "circOut" }}
                                        className="w-full bg-gradient-to-t from-purple-600/20 to-purple-500/60 rounded-t-sm group-hover/bar:from-purple-500/40 group-hover/bar:to-purple-400 transition-all"
                                        style={{ minHeight: '4px' }}
                                    />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-black text-[10px] font-black rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] translate-y-2 group-hover/bar:translate-y-0 shadow-2xl">
                                        {h} besøk
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>

                    <div className="flex justify-between mt-8 px-2 text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] border-t border-white/5 pt-6">
                        <span>30 dager siden</span>
                        <span>I dag</span>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Top Pages */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 hover:border-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Globe size={20} className="text-blue-500" />
                            Populære Sider
                        </h3>
                        <div className="space-y-8">
                            {topPages.map((proj, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-default">
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-sm mb-1 group-hover:text-blue-500 transition-colors truncate">{proj.path}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500/40 rounded-full" />
                                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Analytics Pageview</p>
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="font-mono text-lg font-bold tracking-tighter">{proj.count}</p>
                                    </div>
                                </div>
                            ))}
                            {topPages.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-gray-600 italic">Ingen trafikk-data registrert ennå...</p>
                                </div>
                            )}
                        </div>
                        
                        <Link
                            href="/dashboard/nettside-prosjekter"
                            className="mt-12 pt-8 border-t border-white/5 w-full flex items-center justify-center gap-2 text-[10px] font-black text-gray-600 hover:text-white transition-colors group uppercase tracking-[0.2em]"
                        >
                            Alle prosjekter
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Siste Aktivitet */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 hover:border-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Activity size={20} className="text-emerald-500" />
                            Live Aktivitet
                        </h3>
                        <div className="space-y-6">
                            {recentActivity.map((act, i) => (
                                <div key={i} className="flex items-start gap-5 group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                                        {act.icon}
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-500">{act.user}</p>
                                            <p className="text-[9px] text-gray-700 font-black font-mono uppercase">{act.time}</p>
                                        </div>
                                        <p className="text-sm text-white font-medium leading-relaxed truncate">{act.action}</p>
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
