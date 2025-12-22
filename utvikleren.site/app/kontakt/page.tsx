"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function KontaktPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Noe gikk galt. Prøv igjen senere.");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error: any) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage(error.message || "Det oppsto en feil. Vennligst prøv igjen.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">

                    {/* Left: Contact Info */}
                    <div>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-6xl md:text-8xl font-medium tracking-tighter mb-12"
                        >
                            La oss <br />
                            prate.
                        </motion.h1>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xl font-medium mb-4 text-gray-400">Kontaktinfo</h3>
                                <ul className="space-y-4 text-2xl font-light">
                                    <li>
                                        <a href="mailto:post@utvikleren.site" className="hover:text-gray-300 transition-colors flex items-center gap-4">
                                            <Mail size={24} /> post@utvikleren.site
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+4794133924" className="hover:text-gray-300 transition-colors flex items-center gap-4">
                                            <Phone size={24} /> +47 94 13 39 24
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium mb-4 text-gray-400">Møt meg</h3>
                                <p className="text-2xl font-light flex items-start gap-4">
                                    <MapPin size={24} className="mt-1 shrink-0" />
                                    Kristiansand, Norge
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-medium mb-2">Melding sendt!</h3>
                                    <p className="text-gray-400 text-lg">
                                        Takk for din henvendelse. Vi har sendt deg en bekreftelse på e-post og svarer deg så snart som mulig.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
                                >
                                    Send en ny melding
                                </button>
                            </motion.div>
                        ) : (
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Navn</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors"
                                        placeholder="Ditt navn"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">E-post</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors"
                                        placeholder="din@epost.no"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Melding</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors resize-none"
                                        placeholder="Hva kan vi hjelpe deg med?"
                                    />
                                </div>

                                {status === "error" && (
                                    <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                        <AlertCircle size={20} />
                                        <p>{errorMessage}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-white text-black font-medium text-xl py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? (
                                        <>
                                            Sender...
                                            <Loader2 className="animate-spin" size={20} />
                                        </>
                                    ) : (
                                        <>
                                            Send Melding
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
