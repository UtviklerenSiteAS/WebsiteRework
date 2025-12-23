"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, Quote, Calendar, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
    id: string;
    client: string;
    title: string;
    description: string;
    detailed_content: string;
    review_text: string;
    review_author: string;
    tags: string[];
    color: string;
    image: string;
    created_at: string;
}

export default function ReferanseDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchProject() {
            try {
                const { data, error } = await supabase
                    .from('referanser')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                router.push("/referanser");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchProject();
    }, [id, supabase, router]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-white/20" />
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl -mr-64 -mt-64" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link 
                        href="/referanser" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Tilbake til referanser</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex gap-2 mb-6">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
                                {project.client}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-8">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-8 py-8 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">Dato</p>
                                        <p className="font-medium">{new Date(project.created_at).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                                        <Tag size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">Kategori</p>
                                        <p className="font-medium">{project.title || "Utvikling"}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            {project.image ? (
                                <Image 
                                    src={project.image} 
                                    alt={project.client} 
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br from-${project.color}-500/20 to-black flex items-center justify-center`}>
                                    <span className="text-8xl font-bold opacity-10">{project.client[0]}</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Detailed Content */}
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <h2 className="text-3xl font-medium mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-white rounded-full" />
                                Om Prosjektet
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed font-light whitespace-pre-line">
                                {project.detailed_content || "Vi jobber med å legge til mer informasjon om dette prosjektet. Ta kontakt om du vil vite mer om hvordan vi hjalp " + project.client + "."}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Review & Meta */}
                    <div className="lg:col-span-5 space-y-8">
                        {project.review_text && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden"
                            >
                                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-2xl font-light italic text-white mb-8 leading-relaxed">
                                        "{project.review_text}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent border border-white/10 flex items-center justify-center font-bold">
                                            {project.review_author ? project.review_author[0] : project.client[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{project.review_author || project.client + " Representant"}</p>
                                            <p className="text-sm text-gray-500 italic">Verifisert Kunde</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="bg-white text-black p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6">
                            <h3 className="text-2xl font-bold">Lyst på lignende resultater?</h3>
                            <p className="text-gray-600">
                                Vi kan hjelpe deg med å realisere ditt neste prosjekt med AI og moderne teknologi.
                            </p>
                            <Link 
                                href="/kontakt"
                                className="w-full py-4 bg-black text-white rounded-2xl font-medium hover:bg-gray-900 transition-colors"
                            >
                                Start din reise
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 border-t border-white/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
                        Klar for å skape noe stort?
                    </h2>
                    <Link 
                        href="/kontakt"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-xl font-medium rounded-full hover:bg-gray-200 transition-all hover:scale-105"
                    >
                        <span>La oss prate</span>
                        <ArrowLeft size={20} className="rotate-180" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

