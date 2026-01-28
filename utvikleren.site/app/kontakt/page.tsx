"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BlurText from "../components/reactbits/BlurText";
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success("Melding sendt! Vi hører fra oss snart.");
                setFormData({ name: "", email: "", company: "", message: "" });
            } else {
                toast.error("Noe gikk galt. Prøv igjen senere.");
            }
        } catch (error) {
            toast.error("Kunne ikke sende melding.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">

            <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative pt-32">
                <div className="flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto w-full">

                    {/* LEFT SIDE - Copy */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                            <BlurText
                                text="Start"
                                className="block text-white"
                                delay={0.2}
                            />
                            <BlurText
                                text="reisen."
                                className="block text-white/50"
                                delay={0.6}
                            />
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="space-y-8 max-w-md"
                        >
                            <p className="text-xl text-white/60 leading-relaxed font-light">
                                Vi tar kun inn et begrenset antall prosjekter per kvartal for å sikre maksimal kvalitet.
                                Fortell oss om din visjon, så ser vi om vi er en match.
                            </p>

                            <div className="space-y-4 pt-8 border-t border-white/10">
                                <div>
                                    <h4 className="text-white font-bold mb-1">E-post</h4>
                                    <a href="mailto:post@utvikleren.site" className="text-blue-500 hover:text-white transition-colors">post@utvikleren.site</a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group">
                            {/* Ambient Background Glow */}
                            <div className="absolute top-0 right-0 w-full h-full bg-blue-600/5 blur-[100px] pointer-events-none" />

                            <div className="relative z-10 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-mono uppercase text-white/50 tracking-wider">Navn</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                                        placeholder="Ola Nordmann"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-mono uppercase text-white/50 tracking-wider">E-post</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                                        placeholder="ola@bedrift.no"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-mono uppercase text-white/50 tracking-wider">Bedrift (Valgfritt)</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                                        placeholder="Din Bedrift AS"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-mono uppercase text-white/50 tracking-wider">Melding</label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20 resize-none"
                                        placeholder="Fortell oss om prosjektet..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-bold py-5 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-4 relative z-10"
                            >
                                {isSubmitting ? "Sender..." : "Send Forespørsel"}
                            </button>
                        </form>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
