"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Redirect to dashboard
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black flex flex-col md:flex-row">
            <Navbar />

            {/* Left Column: Brand / Context */}
            <div className="hidden md:flex flex-1 flex-col justify-start p-6 md:p-12 pt-32 md:pt-28 border-r border-white/10 relative overflow-hidden">
                <div className="relative z-10 text-left">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.85] mb-8">
                        Kunde <br />
                        Portal
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-md">
                        Administrer dine prosjekter, se statistikk og kommuniser med teamet ditt.
                    </p>
                </div>

                <div className="relative z-10 mt-auto text-sm font-mono text-gray-500 uppercase tracking-widest">
                    Utvikleren.site AS &copy; 2025
                </div>

                {/* Abstract Background Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Right Column: Login Form */}
            <div className="flex-1 flex flex-col items-center justify-start p-6 md:p-12 pt-32 md:pt-28 bg-black">
                <div className="w-full max-w-md space-y-12 text-left">

                    <div className="md:hidden">
                        <h1 className="text-5xl font-medium tracking-tighter mb-4">Kundeportal</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        {error && (
                            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">E-post</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-gray-700 focus:outline-none focus:border-white transition-colors rounded-none disabled:opacity-50"
                                    placeholder="navn@bedrift.no"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">Passord</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-gray-700 focus:outline-none focus:border-white transition-colors rounded-none disabled:opacity-50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full bg-white text-black h-16 text-lg font-medium flex items-center justify-center gap-2 px-6 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logger inn..." : "Logg Inn"}
                            {!loading && <ArrowRight className="transition-transform group-hover:translate-x-2" />}
                        </button>
                    </form>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-white/10">
                        <Link href="/registrer" className="hover:text-white transition-colors">
                            Har du ikke bruker?
                        </Link>
                        <Link href="/glemt-passord" className="hover:text-white transition-colors">
                            Glemt passord?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
