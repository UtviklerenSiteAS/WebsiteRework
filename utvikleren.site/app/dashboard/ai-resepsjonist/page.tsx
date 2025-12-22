"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Bot, Settings, Activity, MessageSquare } from "lucide-react";

export default function AIResepsjonistDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
                setLoading(false);
            }
        }
        getUser();
    }, []);

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-12">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <Bot size={24} className="text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Resepsjonist</h1>
                </div>
                <p className="text-gray-400">Administrer din AI-drevne resepsjonstjeneste</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity size={20} className="text-green-400" />
                        <h3 className="text-sm font-medium text-gray-400">Status</h3>
                    </div>
                    <p className="text-2xl font-bold">Aktiv</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <MessageSquare size={20} className="text-blue-400" />
                        <h3 className="text-sm font-medium text-gray-400">Samtaler i dag</h3>
                    </div>
                    <p className="text-2xl font-bold">-</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Settings size={20} className="text-purple-400" />
                        <h3 className="text-sm font-medium text-gray-400">Konfigurert</h3>
                    </div>
                    <p className="text-2xl font-bold">Nei</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Configuration Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Konfigurering</h2>
                    <p className="text-gray-400 mb-6">
                        Sett opp din AI resepsjonist for å begynne å ta imot henvendelser automatisk.
                    </p>
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-colors">
                        Start konfigurasjon
                    </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Siste aktivitet</h2>
                    <div className="text-gray-500 text-sm">
                        <p>Ingen aktivitet enda</p>
                    </div>
                </div>

                {/* Knowledge Base */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Kunnskapsbase</h2>
                    <p className="text-gray-400 mb-4">
                        Last opp dokumenter og informasjon som AI-en skal bruke for å svare på spørsmål.
                    </p>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors">
                        Administrer kunnskapsbase
                    </button>
                </div>

                {/* Settings */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Innstillinger</h2>
                    <p className="text-gray-400 mb-4">
                        Tilpass AI-resepsjonistens oppførsel, tone og svar.
                    </p>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors">
                        Åpne innstillinger
                    </button>
                </div>
            </div>
        </div>
    );
}
