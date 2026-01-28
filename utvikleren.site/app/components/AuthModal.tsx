"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const supabase = createClient();

    // Check for user on mount and subscribe to changes
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === "signup") {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        },
                    },
                });
                if (error) throw error;
                toast.success("Account created! Please check your email to confirm.");
                onClose();
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Signed in successfully!");
                onClose();
            }
        } catch (err: any) {
            const errorMessage = err.message || "An unexpected error occurred";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await supabase.auth.signOut();
            toast.success("Signed out successfully");
            onClose();
        } catch (error) {
            toast.error("Error signing out");
        } finally {
            setIsLoading(false);
        }
    };

    // Profile View Component
    const ProfileView = () => (
        <div className="flex flex-col h-full p-8 md:p-10 justify-center items-center text-center">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">
                    {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
                </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
                {user?.user_metadata?.full_name || "User"}
            </h2>
            <p className="text-white/40 text-sm mb-8 break-all">
                {user?.email}
            </p>

            <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-xl py-4 hover:bg-red-500/20 active:scale-[0.98] transition-all"
            >
                {isLoading ? "Signing out..." : "Sign Out"}
            </button>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-500"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full md:h-auto md:w-[440px] bg-[#0a0a0a] md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                    >
                        {/* Mobile Close Button (Top Right) */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white/50">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {user ? (
                            <ProfileView />
                        ) : (
                            <div className="p-8 md:p-10 flex flex-col h-full justify-center">

                                {/* Header */}
                                <div className="mb-8 text-center">
                                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                        {mode === "signin" ? "Welcome back" : "Create account"}
                                    </h2>
                                    <p className="text-white/40 text-sm">
                                        {mode === "signin"
                                            ? "Enter your details to access your account."
                                            : "Join us to start your journey."}
                                    </p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                {/* Form */}
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {mode === "signup" && (
                                        <div className="space-y-1">
                                            <label className="text-xs font-mono text-white/50 uppercase tracking-widest ml-1">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                                                placeholder="John Doe"
                                                required={mode === "signup"}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/50 uppercase tracking-widest ml-1">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="hello@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/50 uppercase tracking-widest ml-1">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-white text-black font-bold rounded-xl py-4 mt-6 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? "Processing..." : (mode === "signin" ? "Sign In" : "Sign Up")}
                                    </button>
                                </form>

                                {/* Toggle Mode */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-white/40">
                                        {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                                        <button
                                            onClick={() => {
                                                setMode(mode === "signin" ? "signup" : "signin");
                                                setError(null);
                                            }}
                                            className="text-white hover:underline font-medium"
                                            type="button"
                                        >
                                            {mode === "signin" ? "Sign Up" : "Sign In"}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
