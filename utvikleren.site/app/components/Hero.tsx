"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import AiPlasmaAnimation from "./AiPlasmaAnimation";

export default function Hero() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!mounted) return <section className="relative min-h-[100dvh] bg-black" />;

    return (
        <section className="relative min-h-[100dvh] lg:h-screen lg:max-h-screen px-6 w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center">
            {/* Background Animation - Integrated, no borders */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-60" />
                <AiPlasmaAnimation />
            </div>

            <div className="max-w-4xl mx-auto w-full z-10 relative text-center pt-20">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 pb-2 leading-[1.05]"
                        >
                            Opplev kvalitet
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            Send henvendelse, få en demo, uten kostnader.<br className="hidden md:block" /> Vi bygger fremtidens digitale løsninger.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="h-14 px-10 rounded-full bg-white text-black font-semibold flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10 min-w-[200px]"
                            >
                                Gå til dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="h-14 px-10 rounded-full bg-white text-black font-semibold flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10 min-w-[200px]"
                            >
                                Logg inn
                            </Link>
                        )}
                        <Link
                            href="/kontakt"
                            className="h-14 px-10 rounded-full bg-white/10 border border-white/20 text-white font-semibold flex items-center justify-center hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 min-w-[200px]"
                        >
                            Kontakt meg
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
