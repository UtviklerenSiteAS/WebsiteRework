"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createClient } from "@/lib/supabase/client";

interface Post {
    id: string;
    title: string;
    category: string;
    slug: string;
    created_at: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 5;
    const supabase = createClient();

    useEffect(() => {
        async function fetchInitialData() {
            setLoading(true);
            try {
                // Fetch total count for pagination
                const { count, error: countError } = await supabase
                    .from('posts')
                    .select('*', { count: 'exact', head: true });

                if (countError) throw countError;
                setTotalCount(count || 0);

                // Fetch posts for the current page
                const from = page * itemsPerPage;
                const to = from + itemsPerPage - 1;

                const { data: postsData, error: postsError } = await supabase
                    .from('posts')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .range(from, to);

                if (postsError) throw postsError;
                setPosts(postsData || []);

                // Check admin status
                const { data: { user } } = await supabase.auth.getUser();
                if (user?.email === 'post@utvikleren.site') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchInitialData();
    }, [supabase, page]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DES"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}. ${month} ${year}`;
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-[1200px] mx-auto">

                    <header className="border-b border-white/20 pb-20 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <h1 className="text-8xl font-medium tracking-tighter mb-8">
                                Innsikt
                            </h1>
                            <p className="text-2xl text-gray-400 font-light">
                                Tanker om teknologi, design og fremtiden av business.
                            </p>
                        </div>

                        {isAdmin && (
                            <Link
                                href="/blog/admin"
                                className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all hover:scale-105"
                            >
                                <Plus size={18} />
                                Ny artikkel
                            </Link>
                        )}
                    </header>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-white/20" />
                        </div>
                    ) : posts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-12">
                                {posts.map((post) => (
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        key={post.id}
                                        className="group block border-t border-white/10 pt-12 hover:border-white/40 transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight group-hover:underline underline-offset-8 decoration-1">
                                                {post.title}
                                            </h2>
                                            <ArrowUpRight size={32} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300" />
                                        </div>
                                        <div className="mt-4 flex items-center gap-6 text-sm md:text-base font-mono text-gray-500 uppercase tracking-widest">
                                            <span>{formatDate(post.created_at)}</span>
                                            <span>/</span>
                                            <span className="text-white">{post.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-12">
                                    <button
                                        onClick={() => setPage(p => Math.max(0, p - 1))}
                                        disabled={page === 0}
                                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors disabled:opacity-0 disabled:cursor-default group"
                                    >
                                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                        Forrige
                                    </button>
                                    <div className="text-sm font-mono text-gray-500">
                                        SIDE {page + 1} AV {totalPages}
                                    </div>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                        disabled={page >= totalPages - 1}
                                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors disabled:opacity-0 disabled:cursor-default group"
                                    >
                                        Neste
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center text-gray-500">
                            <p className="text-xl">Ingen artikler funnet ennå.</p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
