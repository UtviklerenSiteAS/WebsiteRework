"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navbar from "../../components/Navbar";
import { Loader2, Plus, AlertCircle, CheckCircle2 } from "lucide-react";

export default function BlogAdminPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("");

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                if (user?.email === 'post@utvikleren.site') {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (error) {
                console.error("Auth error:", error);
            } finally {
                setLoading(false);
            }
        }
        checkUser();
    }, [supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from('posts')
                .insert([
                    {
                        title,
                        category,
                        excerpt,
                        content,
                        slug,
                        author_id: user.id
                    }
                ]);

            if (error) throw error;

            setMessage({ type: 'success', text: 'Artikkelen er publisert!' });
            // Reset form
            setTitle("");
            setCategory("");
            setExcerpt("");
            setContent("");
            setSlug("");
        } catch (error: any) {
            setMessage({ type: 'error', text: `Feil: ${error.message}` });
        } finally {
            setSubmitting(false);
        }
    };

    // Auto-generate slug from title
    useEffect(() => {
        if (!slug && title) {
            setSlug(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
        }
    }, [title, slug]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-white/20" />
            </div>
        );
    }

    if (!authorized) {
        return (
            <div className="bg-black text-white min-h-screen">
                <Navbar />
                <main className="pt-40 flex flex-col items-center justify-center px-6">
                    <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                    <h1 className="text-4xl font-medium tracking-tighter mb-4 text-center">Tilgang nektet</h1>
                    <p className="text-gray-400 text-center max-w-md">
                        Kun post@utvikleren.site har tilgang til å laste opp blogginnlegg.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-8 px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Logg inn som administrator
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-[800px] mx-auto">
                    <header className="mb-12">
                        <h1 className="text-6xl font-medium tracking-tighter mb-4">Administrer Blogg</h1>
                        <p className="text-gray-400">Logget inn som: <span className="text-white">{user?.email}</span></p>
                    </header>

                    {message && (
                        <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Tittel</label>
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="F.eks. Hvorfor AI er fremtiden"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Kategori</label>
                                <input
                                    required
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="F.eks. Teknologi"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Slug (URL)</label>
                                <input
                                    required
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-colors font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Utdrag (Vises i listen)</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Kort oppsummering av innlegget..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-colors min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Innhold (Markdown)</label>
                            <textarea
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Skriv innlegget ditt her..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-colors min-h-[300px]"
                            />
                        </div>

                        <button
                            disabled={submitting}
                            type="submit"
                            className="w-full h-14 bg-white text-black font-medium rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Plus size={20} />
                                    Publiser artikkel
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
