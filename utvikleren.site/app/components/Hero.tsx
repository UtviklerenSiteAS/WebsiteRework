"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import AiPlasmaAnimation from "./AiPlasmaAnimation";

export default function Hero() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const supabase = createClient();

    useEffect(() => {
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

    return (
        <section className="relative h-screen max-h-screen px-6 w-full overflow-hidden bg-black text-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 w-full z-10 h-full">
                {/* Left Column: Text Content - Aligned to Bottom */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 text-left flex flex-col justify-end pb-20 md:pb-32"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-2 leading-[1.1]">
                        Opplev kvalitet
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
                        Send henvendelse, få en demo, uten kostnader. Vi bygger fremtidens digitale løsninger.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-start gap-4 pt-4"
                    >
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="h-12 px-8 rounded-full bg-white text-black font-medium flex items-center justify-center hover:bg-gray-100 transition-colors min-w-[160px]"
                            >
                                Gå til dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="h-12 px-8 rounded-full bg-white text-black font-medium flex items-center justify-center hover:bg-gray-100 transition-colors min-w-[160px]"
                            >
                                Logg inn
                            </Link>
                        )}
                        <Link
                            href="/kontakt"
                            className="h-12 px-8 rounded-full bg-white/10 border border-white/10 text-white font-medium flex items-center justify-center hover:bg-white/20 transition-colors min-w-[160px]"
                        >
                            Kontakt oss
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Column: AI Plasma Animation - Centered or Top */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden self-center"
                >
                    <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
                        <AiPlasmaAnimation />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
