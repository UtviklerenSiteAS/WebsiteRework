"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

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
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <UserIcon size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-medium tracking-tight">Velkommen tilbake</h1>
                        <p className="text-gray-400 text-lg">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                    <LogOut size={16} />
                    Logg ut
                </button>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-medium mb-2">Dine Prosjekter</h2>
                    <p className="text-gray-400 mb-4">Administrer og overvåk dine prosjekter</p>
                    <div className="text-sm text-gray-500">Ingen prosjekter enda</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-medium mb-2">Support</h2>
                    <p className="text-gray-400 mb-4">Få hjelp fra vårt team</p>
                    <Link
                        href="/kontakt"
                        className="inline-block text-sm text-white hover:underline"
                    >
                        Kontakt support →
                    </Link>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-medium mb-2">Kontoinformasjon</h2>
                    <p className="text-gray-400 mb-4">Administrer din konto</p>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">E-post:</span>
                            <span className="text-white">{user?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Opprettet:</span>
                            <span className="text-white">
                                {user?.created_at ? new Date(user.created_at).toLocaleDateString('nb-NO') : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-medium mb-2">Kommende Funksjoner</h2>
                    <p className="text-gray-400 mb-4">Snart tilgjengelig</p>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>• Prosjektoversikt</li>
                        <li>• Fakturahistorikk</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
