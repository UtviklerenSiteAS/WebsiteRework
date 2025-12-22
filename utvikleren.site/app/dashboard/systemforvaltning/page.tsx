"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Settings, Server, Shield, Database, Activity } from "lucide-react";

export default function SystemforvaltningDashboard() {
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
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                        <Settings size={24} className="text-orange-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Systemforvaltning</h1>
                </div>
                <p className="text-gray-400">Administrer og overvåk dine systemer og tjenester</p>
            </div>

            {/* System Health Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity size={20} className="text-green-400" />
                        <h3 className="text-sm font-medium text-gray-400">System status</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-400">Operasjonell</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Server size={20} className="text-blue-400" />
                        <h3 className="text-sm font-medium text-gray-400">Servere</h3>
                    </div>
                    <p className="text-2xl font-bold">0</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield size={20} className="text-purple-400" />
                        <h3 className="text-sm font-medium text-gray-400">Sikkerhet</h3>
                    </div>
                    <p className="text-2xl font-bold">Aktiv</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Database size={20} className="text-cyan-400" />
                        <h3 className="text-sm font-medium text-gray-400">Backup</h3>
                    </div>
                    <p className="text-2xl font-bold">I dag</p>
                </div>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Server Management */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Server size={24} className="text-blue-400" />
                        <h2 className="text-xl font-semibold">Server administrasjon</h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Administrer servere, overvåk ressursbruk og håndter oppdateringer.
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                        <p>Ingen servere konfigurert enda</p>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors">
                        Konfigurer servere
                    </button>
                </div>

                {/* Security */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield size={24} className="text-purple-400" />
                        <h2 className="text-xl font-semibold">Sikkerhet</h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        SSL-sertifikater, brannmurer og sikkerhetsinnstillinger.
                    </p>
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">SSL-sertifikat</span>
                            <span className="text-sm text-green-400">✓ Gyldig</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Brannmur</span>
                            <span className="text-sm text-green-400">✓ Aktiv</span>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors">
                        Sikkerhetsinnstillinger
                    </button>
                </div>

                {/* Monitoring */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Activity size={24} className="text-green-400" />
                        <h2 className="text-xl font-semibold">Overvåkning</h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Sanntidsovervåkning av systemytelse og oppetid.
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                        <p>Oppetid: 99.9%</p>
                        <p>Responstid: God</p>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors">
                        Se detaljer
                    </button>
                </div>

                {/* Backup & Recovery */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Database size={24} className="text-cyan-400" />
                        <h2 className="text-xl font-semibold">Backup & Gjenoppretting</h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Automatiske backups og gjenopprettingsalternativer.
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                        <p>Siste backup: I dag kl. 03:00</p>
                        <p>Status: Vellykket</p>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors">
                        Administrer backup
                    </button>
                </div>
            </div>
        </div>
    );
}
