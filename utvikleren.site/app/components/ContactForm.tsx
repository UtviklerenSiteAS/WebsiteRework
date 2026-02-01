"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

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
                toast.success("Melding sendt! Vi kommer tilbake til deg snart.");
                setFormData({ name: "", email: "", company: "", message: "" });
            } else {
                toast.error("Noe gikk galt. Vennligst prøv igjen.");
            }
        } catch (error) {
            toast.error("Kunne ikke sende melding.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-transparent border-b border-white/10 py-4 text-lg text-white placeholder:text-white/20 focus:outline-none transition-all duration-300";
    const labelClasses = "text-xs font-mono uppercase tracking-wider text-white/40 mb-2 block transition-colors duration-300";

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto md:mr-0 z-20">
            <div className="space-y-8 p-8 md:p-10 bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-3xl">

                <div className="space-y-6">
                    {/* Name Field */}
                    <div className="relative group">
                        <label className={`${labelClasses} ${focusedField === 'name' ? 'text-purple-400' : ''}`}>
                            Navn
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className={`${inputClasses} ${focusedField === 'name' ? 'border-purple-500/50' : ''}`}
                            placeholder="Ola Nordmann"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <label className={`${labelClasses} ${focusedField === 'email' ? 'text-purple-400' : ''}`}>
                            E-post
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`${inputClasses} ${focusedField === 'email' ? 'border-purple-500/50' : ''}`}
                            placeholder="ola@bedrift.no"
                        />
                    </div>

                    {/* Company Field */}
                    <div className="relative group">
                        <label className={`${labelClasses} ${focusedField === 'company' ? 'text-purple-400' : ''}`}>
                            Bedrift (Valgfritt)
                        </label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className={`${inputClasses} ${focusedField === 'company' ? 'border-purple-500/50' : ''}`}
                            placeholder="Din Bedrift AS"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="relative group">
                        <label className={`${labelClasses} ${focusedField === 'message' ? 'text-purple-400' : ''}`}>
                            Melding
                        </label>
                        <textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={4}
                            className={`${inputClasses} resize-none ${focusedField === 'message' ? 'border-purple-500/50' : ''}`}
                            placeholder="Fortell oss om ditt prosjekt..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-medium py-4 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Setsender...
                            </>
                        ) : (
                            <>
                                Send Melding <Send className="w-4 h-4" />
                            </>
                        )}
                    </span>
                </button>
            </div>
        </form>
    );
}
