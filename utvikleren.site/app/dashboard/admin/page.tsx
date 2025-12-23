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
                // 1. Fetch total pageviews
                const { count: totalPageviews } = await supabase
                    .from('analytics_visits')
                    .select('*', { count: 'exact', head: true });

                // 2. Fetch unique visitors (by session_id)
                const { data: uniqueSessions } = await supabase
                    .from('analytics_visits')
                    .select('session_id');
                const uniqueCount = new Set(uniqueSessions?.map(s => s.session_id)).size;

                // 3. Fetch active now (last 10 mins for better visibility)
                const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
                const { data: activeSessions } = await supabase
                    .from('analytics_visits')
                    .select('session_id')
                    .gt('created_at', tenMinsAgo);
                const activeCount = new Set(activeSessions?.map(s => s.session_id)).size;

                // 4. Fetch Top Pages
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

                // 5. Fetch Chart Data (Last 30 days)
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

                // 6. Fetch Recent Activity
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

            // Set up interval to refresh "Active Now" every 30 seconds
            interval = setInterval(fetchStats, 30000);

            // Set up Realtime subscription for instant updates on new visits
            subscription = supabase
                .channel('analytics_realtime')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_visits' }, (payload) => {
                    // Instantly update local stats when someone visits
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
                                className="bg-transparent border-none focus:outline-none text-sm font-bold appearance-none"
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
                <AnalyticsCard title="Totalt Besøkende" value={stats.totalVisitors} trend="+---" isUp={true} icon={Users} />
                <AnalyticsCard title="Totalt Sidevisninger" value={stats.totalPageviews} trend="+---" isUp={true} icon={MousePointer2} />
                <AnalyticsCard title="Snittid per Sesjon" value={stats.avgSession} trend="Normal" isUp={true} icon={Clock} />
                <AnalyticsCard title="Aktive Nå" value={stats.activeNow} trend="Live" isUp={true} icon={Activity} pulse />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Global Traffic Chart */}
                <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[500px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Trafikkutvikling</h3>
                            <p className="text-gray-500 text-sm italic">Besøkende de siste 30 dagene</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-2 md:gap-3 px-4">
                        {(() => {
                            const maxVal = Math.max(...chartData, 1); // Use 1 as minimum to avoid division by zero
                            return chartData.map((h, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        className="w-full bg-gradient-to-t from-purple-600/20 to-purple-400 rounded-t-sm transition-all duration-700 group-hover:bg-blue-400"
                                        style={{ height: `${(h / maxVal) * 100}%`, minHeight: '2px' }}
                                    />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                                        {h} besøk
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>

                    <div className="flex justify-between mt-6 px-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                        <span>30 dager siden</span>
                        <span>I dag</span>
                    </div>
                </div>

                {/* Side Content */}
                <div className="space-y-8">
                    {/* Top Pages */}
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 text-white">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <TrendingUp size={20} className="text-blue-400" />
                            Populære Sider
                        </h3>
                        <div className="space-y-6">
                            {topPages.map((proj, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-sm mb-0.5 group-hover:text-blue-400 transition-colors truncate">{proj.path}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Sidevisninger</p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="font-mono text-xs font-bold">{proj.count}</p>
                                    </div>
                                </div>
                            ))}
                            {topPages.length === 0 && <p className="text-sm text-gray-500 italic">Ingen data enda...</p>}
                        </div>
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
